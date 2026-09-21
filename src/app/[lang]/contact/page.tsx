import type { Metadata } from "next";
import { submitContact } from "@/app/actions/contact";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveLocale, withLocale } from "@/lib/i18n/config";
import { pageSeo } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ sent?: string; error?: string; product?: string }>;
};

// Must match PERSONA_TYPES / INQUIRY_TYPES / TIMELINES in the server action —
// the localized labels below are cosmetic only, these English values are what
// actually gets submitted and validated.
const EN_PERSONAS = ["Farmer / Farm Owner", "Global Buyer / Importer", "Strategic Partner", "Other"];

const EN_INQUIRIES = [
  "Strategic Sourcing & Procurement",
  "Honey No. 9 Export & Supply",
  "Organic Certification Stewardship (Auditing/Consultancy)",
  "Japanese Agricultural Inputs (Distribution/Trials)",
  "Investor & Stakeholder Relations",
];

const EN_TIMELINES = ["Immediate", "Next Season", "Research Phase"];

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.705716053586!2d106.70960757355158!3d10.757148459552042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f655d851335%3A0xbe41f3b0e056fb87!2zNjkyLzMxIMSQb8OgbiBWxINuIELGoSwgUGjGsOG7nW5nIDE2LCBRdeG6rW4gNCwgSOG7kyBDaMOtIE1pbmggMDcwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1757321932129!5m2!1svi!2sus";

const inputClass =
  "w-full rounded-[var(--radius-control)] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand)]";

function RadioCards({
  name,
  options,
  labels,
  columns = 2,
}: {
  name: string;
  options: readonly string[];
  labels: readonly string[];
  columns?: 2 | 4;
}) {
  return (
    <div className={`grid gap-2 ${columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-2"}`}>
      {options.map((value, i) => (
        <label key={value} className="group cursor-pointer">
          <input
            type="radio"
            name={name}
            value={value}
            required
            defaultChecked={i === 0}
            className="peer sr-only"
          />
          <span className="body-sm block rounded-[var(--radius-control)] border border-[var(--line)] px-4 py-3 text-[var(--ink)] transition peer-checked:border-[var(--brand)] peer-checked:bg-[var(--brand)]/5 peer-checked:font-semibold peer-checked:text-[var(--brand)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--brand)]">
            {labels[i] ?? value}
          </span>
        </label>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  return pageSeo({
    lang: locale,
    path: "/contact",
    title: dict.contact.title,
    description: dict.contact.intro2 || dict.contact.intro1,
    image: "/images/voac/voac-ho-tro-1.jpg",
  });
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { lang: raw } = await params;
  const lang = resolveLocale(raw);
  const dict = getDictionary(lang);
  const c = dict.contact;
  const { sent, error, product } = await searchParams;
  const productName = product?.trim().slice(0, 200);

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        image="/images/voac/voac-ho-tro-1.jpg"
        homeHref={withLocale(lang, "/")}
        crumbs={[{ href: withLocale(lang, "/contact"), label: c.title }]}
      />

      <Reveal className="container-page section-y grid gap-12 md:grid-cols-2">
        <div id="contact-form" className="scroll-mt-28">
          {sent === "1" && (
            <p className="mb-6 rounded-[var(--radius-control)] border border-[var(--brand)]/30 bg-[var(--brand)]/5 px-4 py-3 text-sm text-[var(--brand)]">
              {c.sent}
            </p>
          )}
          {error === "1" && (
            <p className="mb-6 rounded-[var(--radius-control)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {c.error}
            </p>
          )}

          {productName && (
            <p className="mb-6 rounded-[var(--radius-control)] border border-[var(--brand)]/30 bg-[var(--brand)]/5 px-4 py-3 text-sm text-[var(--brand)]">
              {c.aboutProduct}: <strong>{productName}</strong>
            </p>
          )}

          <form action={submitContact} className="space-y-4">
            <input type="hidden" name="locale" value={lang} />
            {productName && (
              <input type="hidden" name="product" value={productName} />
            )}

            <div>
              <span className="mb-1.5 block text-sm text-[var(--muted)]">{c.personaLabel}</span>
              <RadioCards name="persona" options={EN_PERSONAS} labels={c.personas} columns={4} />
            </div>

            <input name="name" required placeholder={c.name} className={inputClass} />
            <input
              name="email"
              type="email"
              required
              placeholder={c.email}
              className={inputClass}
            />
            <input name="company" required placeholder={c.company} className={inputClass} />
            <input name="location" required placeholder={c.location} className={inputClass} />
            <input name="phone" placeholder={c.phone} className={inputClass} />

            <div>
              <span className="mb-1.5 block text-sm text-[var(--muted)]">{c.inquiry}</span>
              <RadioCards name="inquiry" options={EN_INQUIRIES} labels={c.inquiries} columns={2} />
            </div>

            <textarea
              name="message"
              rows={6}
              maxLength={2000}
              placeholder={c.message}
              className={inputClass}
            />

            <label className="block">
              <span className="mb-1.5 block text-sm text-[var(--muted)]">{c.timeline}</span>
              <select
                name="timeline"
                required
                defaultValue={EN_TIMELINES[0]}
                className={inputClass}
              >
                {EN_TIMELINES.map((value, i) => (
                  <option key={value} value={value}>
                    {c.timelines[i] ?? value}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="rounded-[var(--radius-control)] bg-[var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[var(--shadow-soft)] transition hover:bg-[var(--brand-2)]"
            >
              {c.submit}
            </button>
          </form>
        </div>

        <div>
          <h2 className="display-md">
            {c.companyName}
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{c.intro1}</p>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{c.intro2}</p>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 font-semibold uppercase tracking-wide">
                {c.emailLabel}
              </dt>
              <dd>
                <a href="mailto:info@flora-global.vn" className="text-[var(--accent)] underline">
                  info@flora-global.vn
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 font-semibold uppercase tracking-wide">
                {c.phoneLabel}
              </dt>
              <dd>
                <a href="tel:0932108990" className="text-[var(--accent)] underline">
                  0932.108.990
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 font-semibold uppercase tracking-wide">
                {c.addressLabel}
              </dt>
              <dd className="text-[var(--muted)]">{dict.footer.address}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 font-semibold uppercase tracking-wide">
                {c.hoursLabel}
              </dt>
              <dd className="text-[var(--muted)]">
                {c.hours}
                <br />
                <em>{c.hoursNote}</em>
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <iframe
        title="Flora Global head office map"
        src={MAP_SRC}
        width="100%"
        height={450}
        loading="lazy"
        className="block w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
}
