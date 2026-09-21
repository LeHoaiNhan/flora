import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/catalog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizeCategories, localizeProducts } from "@/lib/i18n/localized-catalog";
import { resolveLocale, withLocale } from "@/lib/i18n/config";
import { pageSeo } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  return pageSeo({
    lang: locale,
    path: "/products",
    title: dict.productsPage.title,
    description: dict.productsPage.intro,
    image: "/images/wp/2026_03_ELITE.jpg",
  });
}

export default async function ProductsPage({ params }: Props) {
  const { lang: raw } = await params;
  const lang = resolveLocale(raw);
  const dict = getDictionary(lang);
  const [rawProducts, rawCategories] = await Promise.all([getProducts(), getCategories()]);
  const products = localizeProducts(rawProducts, lang);
  const categories = localizeCategories(rawCategories, lang);

  return (
    <>
      <PageHero
        eyebrow={dict.productsPage.eyebrow}
        title={dict.productsPage.title}
        image="/images/wp/2026_03_ELITE.jpg"
        homeHref={withLocale(lang, "/")}
        crumbs={[{ href: withLocale(lang, "/products"), label: dict.productsPage.title }]}
      />
      <div className="container-page section-y">
        <p className="lead max-w-2xl text-[var(--muted)]">{dict.productsPage.intro}</p>

        {/* Category browsing now lives at its own path (/products/{category}) instead
            of a query filter, so these chips navigate rather than self-filter. */}
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="body-sm rounded-[var(--radius-control)] border border-[var(--brand)] bg-[var(--brand)] px-4 py-2 text-white">
            {dict.productsPage.all}
          </span>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={withLocale(lang, `/products/${c.slug}`)}
              className="body-sm rounded-[var(--radius-control)] border border-[var(--line)] px-4 py-2 text-[var(--ink)] transition hover:border-[var(--brand)]"
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
