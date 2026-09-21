import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
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

  return (
    <>
      <JsonLd data={[productLd, crumbs]} />
      <Reveal className="container-page section-y grid gap-10 md:grid-cols-2">
      <div className="card relative aspect-square bg-[var(--bg-soft)]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#dce8d4_0%,#b7c9a5_45%,#6f8f5a_100%)]" />
        )}
      </div>
      <div className="min-w-0">
        <Link
          href={withLocale(lang, "/products")}
          className="body-sm text-[var(--muted)] hover:text-[var(--brand)]"
        >
          {dict.common.backProducts}
        </Link>
        <h1 className="display-lg mt-4 break-words text-[var(--ink)]">
          {product.name}
        </h1>
        <p className="eyebrow mt-4 text-[var(--brand)]">
          {dict.common.wholesaleOnly}
        </p>
        {(product.description || product.short_description) && (
          <p className="body-base mt-6 whitespace-pre-line break-words text-[var(--ink)]/85">
            {product.description || product.short_description}
          </p>
        )}
        <div className="card mt-8 border-[var(--brand)]/25 bg-[var(--brand)]/5 p-5">
          <p className="display-sm text-[var(--brand)]">
            {dict.common.wholesaleTitle}
          </p>
          <Link
            href={`${withLocale(lang, "/contact")}?product=${encodeURIComponent(product.name)}#contact-form`}
            className="mt-5 inline-flex items-center justify-center rounded-[var(--radius-control)] bg-[var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[var(--shadow-soft)] transition hover:bg-[var(--brand-2)]"
          >
            {dict.common.wholesaleCta}
          </Link>
        </div>
      </div>
      </Reveal>
    </>
  );
}
