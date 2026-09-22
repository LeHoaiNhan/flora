import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductTabs, type ProductTab } from "@/components/product-tabs";
import { getCategories, getProductBySlug, getProducts } from "@/lib/catalog";
import type { Product } from "@/lib/data/local";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";
import {
  localizeCategories,
  localizeProduct,
  localizeProducts,
} from "@/lib/i18n/localized-catalog";
import { locales, resolveLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME, abs, breadcrumbLd, pageSeo } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: Promise<{ lang: string; slug: string }> };

// This single dynamic segment resolves to EITHER a category (path-based
// browsing, e.g. /products/nguyen-lieu-nhap-khau-huu-co) OR a product detail
// page (e.g. /products/phan-ga-huu-co-nhat-ban) — the two slug spaces don't
// collide today, and this avoids nesting product URLs under /products/[category]/[slug],
// which would need every product fetch (including the Supabase-backed one) to
// resolve category membership just to build a link.
export async function generateStaticParams() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return locales.flatMap((lang) => [
    ...products.map((p) => ({ lang, slug: p.slug })),
    ...categories.map((c) => ({ lang, slug: c.slug })),
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = resolveLocale(raw);
  const dict = getDictionary(lang);

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    const [localized] = localizeCategories([category], lang);
    return pageSeo({
      lang,
      path: `/products/${slug}`,
      title: localized.name,
      description: localized.description || dict.productsPage.intro,
      image: "/images/wp/2026_03_ELITE.jpg",
    });
  }

  const base = await getProductBySlug(slug);
  if (!base) return { title: "Not found" };
  const product = localizeProduct(base, lang);
  return pageSeo({
    lang,
    path: `/products/${slug}`,
    title: product.name,
    description:
      product.short_description || product.description?.slice(0, 200) || undefined,
    image: product.image_url,
  });
}

export default async function ProductOrCategoryPage({ params }: Props) {
  const { lang: raw, slug } = await params;
  const lang = resolveLocale(raw);
  const dict = getDictionary(lang);

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (category) {
    return <CategoryListing lang={lang} dict={dict} categorySlug={slug} />;
  }

  const base = await getProductBySlug(slug);
  if (!base) notFound();
  return <ProductDetail lang={lang} dict={dict} slug={slug} product={localizeProduct(base, lang)} />;
}

async function CategoryListing({
  lang,
  dict,
  categorySlug,
}: {
  lang: Locale;
  dict: Dictionary;
  categorySlug: string;
}) {
  const [rawProducts, rawCategories] = await Promise.all([
    getProducts({ category: categorySlug }),
    getCategories(),
  ]);
  const products = localizeProducts(rawProducts, lang);
  const categories = localizeCategories(rawCategories, lang);
  const current = categories.find((c) => c.slug === categorySlug)!;

  const crumbs = breadcrumbLd([
    { name: SITE_NAME, path: withLocale(lang, "/") },
    { name: dict.productsPage.title, path: withLocale(lang, "/products") },
    { name: current.name, path: withLocale(lang, `/products/${categorySlug}`) },
  ]);

  return (
    <>
      <JsonLd data={[crumbs]} />
      <PageHero
        eyebrow={dict.productsPage.eyebrow}
        title={current.name}
        image="/images/wp/2026_03_ELITE.jpg"
        homeHref={withLocale(lang, "/")}
        crumbs={[
          { href: withLocale(lang, "/products"), label: dict.productsPage.title },
          { href: withLocale(lang, `/products/${categorySlug}`), label: current.name },
        ]}
      />
      <div className="container-page section-y">
        {current.description && (
          <p className="lead max-w-2xl text-[var(--muted)]">{current.description}</p>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href={withLocale(lang, "/products")}
            className="body-sm rounded-[var(--radius-control)] border border-[var(--line)] px-4 py-2 text-[var(--ink)] transition hover:border-[var(--brand)]"
          >
            {dict.productsPage.all}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={withLocale(lang, `/products/${c.slug}`)}
              className={`body-sm rounded-[var(--radius-control)] border px-4 py-2 transition ${
                c.slug === categorySlug
                  ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                  : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--brand)]"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              href={withLocale(lang, `/products/${p.slug}`)}
              organicLabel={dict.common.organic}
              wholesaleLabel={dict.common.wholesaleOnly}
            />
          ))}
        </Reveal>
        {products.length === 0 && (
          <p className="body-base mt-10 text-[var(--muted)]">{dict.productsPage.empty}</p>
        )}
      </div>
    </>
  );
}

function ProductDetail({
  lang,
  dict,
  slug,
  product,
}: {
  lang: Locale;
  dict: Dictionary;
  slug: string;
  product: Product;
}) {
  const pd = dict.productDetail;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description || product.description || product.name,
    ...(product.image_url ? { image: abs(product.image_url) } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    url: abs(withLocale(lang, `/products/${slug}`)),
  };
  const crumbs = breadcrumbLd([
    { name: SITE_NAME, path: withLocale(lang, "/") },
    { name: dict.productsPage.title, path: withLocale(lang, "/products") },
    { name: product.name, path: withLocale(lang, `/products/${slug}`) },
  ]);

  const gallery = product.gallery?.length
    ? product.gallery
    : product.image_url
      ? [product.image_url]
      : [];

  const specs = [
    product.origin && { label: pd.originLabel, value: product.origin },
    product.manufacturer && { label: pd.manufacturerLabel, value: product.manufacturer },
    product.packaging && { label: pd.packagingLabel, value: product.packaging },
    product.licenseNo && { label: pd.licenseLabel, value: product.licenseNo },
    product.storageNote && { label: pd.storageLabel, value: product.storageNote },
  ].filter(Boolean) as { label: string; value: string }[];

  const tabs: ProductTab[] = [
    product.description && {
      key: "description",
      label: pd.descriptionTitle,
      content: (
        <p className="body-base max-w-3xl whitespace-pre-line text-[var(--ink)]/85">
          {product.description}
        </p>
      ),
    },
    !!product.usageSteps?.length && {
      key: "process",
      label: pd.processTitle,
      content: (
        <ol className="max-w-2xl space-y-5">
          {product.usageSteps!.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="body-base font-semibold text-[var(--ink)]">{step.title}</p>
                <p className="body-sm mt-1 text-[var(--ink)]/75">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    !!specs.length && {
      key: "specs",
      label: pd.specsTitle,
      content: (
        <dl className="max-w-3xl divide-y divide-[var(--line)] rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--surface)]">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <dt className="body-sm shrink-0 text-[var(--muted)] sm:w-56">{s.label}</dt>
              <dd className="body-sm font-medium text-[var(--ink)] sm:text-right">{s.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    !!product.capabilityDetails?.length && {
      key: "capability",
      label: pd.capabilityTitle,
      content: (
        <div>
          <p className="body-base max-w-2xl text-[var(--ink)]/85">{pd.capabilityDesc}</p>
          <ul className="mt-5 grid max-w-3xl gap-2.5 sm:grid-cols-2">
            {product.capabilityDetails!.map((text) => (
              <li
                key={text}
                className="flex gap-2.5 rounded-[var(--radius-control)] bg-[var(--surface)] p-3"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
                <span className="body-sm text-[var(--ink)]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ].filter(Boolean) as ProductTab[];

  return (
    <>
      <JsonLd data={[productLd, crumbs]} />
      <Reveal className="container-page section-y grid gap-10 md:grid-cols-2">
        <div>
          <ProductGallery images={gallery} alt={product.name} />
        </div>
        <div className="min-w-0">
          <Link
            href={withLocale(lang, "/products")}
            className="body-sm text-[var(--muted)] hover:text-[var(--brand)]"
          >
            {dict.common.backProducts}
          </Link>
          <h1 className="display-lg mt-4 break-words text-[var(--ink)]">{product.name}</h1>
          <p className="eyebrow mt-4 text-[var(--brand)]">{dict.common.wholesaleOnly}</p>
          {product.short_description && (
            <p className="body-base mt-4 text-[var(--ink)]/85">{product.short_description}</p>
          )}

          {!!product.highlights?.length && (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((text) => (
                <li
                  key={text}
                  className="flex gap-2.5 rounded-[var(--radius-control)] bg-[var(--bg-soft)] p-3"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  <span className="body-sm text-[var(--ink)]">{text}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="card mt-8 border-[var(--brand)]/25 bg-[var(--brand)]/5 p-5">
            <Link
              href={`${withLocale(lang, "/contact")}?product=${encodeURIComponent(product.name)}#contact-form`}
              className="inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[var(--shadow-soft)] transition hover:bg-[var(--brand-2)]"
            >
              {dict.common.wholesaleCta}
            </Link>
          </div>
        </div>
      </Reveal>

      {tabs.length > 0 && (
        <div className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
          <div className="container-page section-y">
            <ProductTabs tabs={tabs} />
          </div>
        </div>
      )}

      <RelatedProducts lang={lang} dict={dict} product={product} />

      {!!product.faqs?.length && (
        <div className="border-t border-[var(--line)]">
          <div className="container-page section-y max-w-3xl">
            <p className="display-sm text-[var(--ink)]">{pd.faqTitle}</p>
            <div className="mt-5 divide-y divide-[var(--line)] rounded-[var(--radius-card)] border border-[var(--line)]">
              {product.faqs.map((f) => (
                <details key={f.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 body-base font-medium text-[var(--ink)] marker:content-none">
                    {f.question}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 text-[var(--brand)] transition group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="body-sm mt-3 text-[var(--ink)]/80">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

async function RelatedProducts({
  lang,
  dict,
  product,
}: {
  lang: Locale;
  dict: Dictionary;
  product: Product;
}) {
  const category = product.category_slugs?.[0];
  if (!category) return null;

  const rawProducts = await getProducts({ category });
  const related = localizeProducts(rawProducts, lang).filter((p) => p.id !== product.id);
  if (related.length === 0) return null;

  return (
    <div className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="container-page section-y">
        <p className="display-sm text-[var(--ink)]">{dict.productDetail.relatedTitle}</p>
        <Reveal className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              href={withLocale(lang, `/products/${p.slug}`)}
              organicLabel={dict.common.organic}
              wholesaleLabel={dict.common.wholesaleOnly}
            />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
