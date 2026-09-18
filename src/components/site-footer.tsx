import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { NEWS_CATEGORIES, SERVICE_ORDER } from "@/lib/legacy";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const support = [
    {
      href: withLocale(locale, "/about-us"),
      icon: "/images/wp/2018_07_t1.jpg",
      lines: [f.infoAbout, f.aboutUs],
    },
    {
      href: withLocale(locale, "/news"),
      icon: "/images/wp/2018_07_t2.jpg",
      lines: [f.newUpdates, f.fromUs],
    },
    {
      href: withLocale(locale, "/contact"),
      icon: "/images/wp/2018_07_t3.jpg",
      lines: [f.contact, f.withUs],
    },
  ];

  return (
    <footer className="relative mt-auto isolate overflow-hidden">
      <Image
        src="/images/footer/HOME_0000s_0007s_0000s_0000_BG.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none object-cover"
      />
      <div className="bg-[color-mix(in_srgb,var(--brand)_62%,transparent)] text-white">
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-3">
          <p className="display-md">
            {f.needHelp}
            <br />
            {f.needSupport}
          </p>
          <div className="grid gap-5 sm:grid-cols-3 md:col-span-2">
            {support.map((box) => (
              <Link key={box.href} href={box.href} className="group flex items-center gap-3">
                <Image
                  src={box.icon}
                  alt=""
                  width={50}
                  height={50}
                  className="h-12 w-12 shrink-0 rounded-full bg-white object-contain"
                />
                <span className="text-lg leading-snug group-hover:underline">
                  {box.lines[0]}
                  <br />
                  {box.lines[1]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[color-mix(in_srgb,var(--bg-soft)_78%,transparent)] text-[var(--ink)]">
        <div className="container-page relative z-10 grid grid-cols-12 gap-8 py-12">
          <div className="col-span-full lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/footer/flora-logo-footer.png"
                alt="Flora Global"
                width={784}
                height={672}
                className="h-24 w-auto shrink-0 object-contain"
              />
              <p className="text-xl font-bold leading-snug text-[var(--ink)]">
                {f.companyTitle.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            </div>
            <address className="space-y-2 text-lg not-italic text-[var(--muted)]">
              <p>
                <span className="font-semibold text-[var(--ink)]">{f.addressLabel}: </span>
                {f.address}
              </p>
              <p>
                <span className="font-semibold text-[var(--ink)]">{dict.contact.phoneLabel}: </span>
                <a href="tel:0932108990" className="hover:text-[var(--brand)]">
                  0932.108.990
                </a>
              </p>
              <p>
                <span className="font-semibold text-[var(--ink)]">{dict.contact.emailLabel}: </span>
                <a href="mailto:info@flora-global.vn" className="hover:text-[var(--brand)]">
                  info@flora-global.vn
                </a>
              </p>
              <p>
                <a
                  href="https://www.facebook.com/profile.php?id=61564643382722"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--brand)]"
                >
                  {f.facebook}
                </a>
              </p>
            </address>
          </div>

          <div className="col-span-full grid gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <FooterTitle>{f.aboutTitle}</FooterTitle>
              <ul className="space-y-2 text-lg text-[var(--muted)]">
                <li>
                  <Link href={withLocale(locale, "/about-us")} className="hover:text-[var(--brand)]">
                    {dict.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={withLocale(locale, "/contact")} className="hover:text-[var(--brand)]">
                    {dict.nav.contact}
                  </Link>
                </li>
                <li>
                  <Link href={withLocale(locale, "/products")} className="hover:text-[var(--brand)]">
                    {dict.nav.products}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <FooterTitle>{f.servicesTitle}</FooterTitle>
              <ul className="space-y-2 text-lg text-[var(--muted)]">
                {SERVICE_ORDER.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={withLocale(locale, `/services/${slug}`)}
                      className="hover:text-[var(--brand)]"
                    >
                      {dict.services[slug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterTitle>{f.blogsTitle}</FooterTitle>
              <ul className="space-y-2 text-lg text-[var(--muted)]">
                {NEWS_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={withLocale(locale, `/news/category/${c.slug}`)}
                      className="hover:text-[var(--brand)]"
                    >
                      {dict.newsCategories[c.slug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative isolate overflow-hidden border-t border-[var(--line)] py-6 text-center text-sm text-[var(--muted)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center overflow-hidden whitespace-nowrap text-[clamp(2.5rem,9vw,6.5rem)] font-black uppercase leading-none tracking-wide text-[var(--brand)] opacity-10"
          >
            Flora Global
          </span>
          {f.copyright.replace("{year}", String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="text-lg font-semibold uppercase tracking-wide text-[var(--ink)]">{children}</p>
      <div className="mb-4 mt-2 h-0.5 w-10 bg-[var(--brand)]" />
    </>
  );
}
