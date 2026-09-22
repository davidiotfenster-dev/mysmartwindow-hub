import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Linkedin } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, Section } from '@/components/ui/primitives'
import { Stagger, StaggerItem } from '@/components/ui/motion'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { getTeam } from '@/lib/content'
import { absolute, alternates, breadcrumbSchema, jsonLd, ORG_NAME, ORG_URL } from '@/lib/seo'
import { fill } from '@/lib/utils'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.team.title,
    description: dict.team.subtitle,
    alternates: alternates('/ingenieria/equipo', locale),
    openGraph: {
      type: 'website',
      title: dict.team.title,
      description: dict.team.subtitle,
      url: absolute(`/${locale}/ingenieria/equipo`),
    },
  }
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const [dict, team] = await Promise.all([getDictionary(locale), getTeam()])

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.engineering.eyebrow, path: `/${locale}/ingenieria` },
    { name: dict.team.title, path: `/${locale}/ingenieria/equipo` },
  ]

  // Cada persona como `Person` dentro de la organizacion: es lo que permite a
  // un buscador responder «quien dirige IoT Fenster» citando esta pagina.
  const peopleSchema = team.map((member) => ({
    '@type': 'Person',
    '@id': absolute(`/${locale}/ingenieria/equipo#${member.id}`),
    name: member.name,
    jobTitle: member.role[locale],
    description: member.bio[locale],
    worksFor: { '@type': 'Organization', name: ORG_NAME, url: ORG_URL },
    ...(member.photo ? { image: absolute(member.photo) } : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  }))

  return (
    <>
      <JsonLd data={jsonLd(...peopleSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.team.eyebrow}
        title={<GradientTitle text={dict.team.title} />}
        subtitle={dict.team.subtitle}
      />

      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <StaggerItem key={member.id} className="h-full">
              <article
                id={member.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 transition-all hover:-translate-y-1 hover:border-brand-500/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgb(0_151_178/0.18),transparent_70%)]">
                  <div className="grid-tech absolute inset-0 opacity-40" aria-hidden="true" />
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    // Sin foto, las iniciales: mejor que un hueco gris mientras
                    // alguien sube la suya al CMS.
                    <span className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-brand-500/25">
                      {member.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-500">
                    {member.role[locale]}
                  </p>
                  <h2 className="mt-1.5 font-display text-lg font-bold">{member.name}</h2>
                  <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-fg-muted">
                    {member.bio[locale]}
                  </p>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={fill(dict.team.linkedinLabel, { name: member.name })}
                      className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-all hover:border-brand-500 hover:text-brand-500"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section className="bg-bg-subtle">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 px-7 py-12 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {dict.team.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">
            {dict.team.ctaText}
          </p>
          <div className="mt-8">
            <ButtonLink href={routes.contacto(locale)} size="lg">
              {dict.engineering.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
