import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../i18n/routing'
import '../globals.css'
import PageLoader from '../../components/PageLoader'
import ScrollProgress from '../../components/ScrollProgress'
import CookieConsent from '../../components/CookieConsent'
import BackToTop from '../../components/BackToTop'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function generateViewport() {
  return {
    themeColor: '#f7f6f4',
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const titles = {
    da: 'KNAPVÆRK | Håndlavede knapper',
    en: 'KNAPVÆRK | Handcrafted Buttons'
  }

  const descriptions = {
    da: 'KNAPVÆRK er et værksted, der arbejder altovervejende i træ. Alle knapper begynder og slutter ved materialets struktur, styrker og begrænsninger. Arbejdet udføres med traditionelle metoder.',
    en: 'KNAPVÆRK is a workshop working predominantly in wood. All buttons begin and end with the structure, strengths and limitations of the material. Work is carried out using traditional methods.'
  }

  return {
    metadataBase: new URL('https://www.knapvaerk.com'),
    title: titles[locale as keyof typeof titles] || titles.da,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.da,
    keywords: locale === 'en'
      ? 'Knapværk, fashion brand, handcrafted buttons, design, exclusive'
      : 'Knapværk, modebrand, håndlavede knapper, design, eksklusivt',
    authors: [{ name: 'Knapværk' }],
    manifest: '/assets/icons/site.webmanifest',
    icons: {
      icon: [
        { url: '/assets/icons/favicon.ico', sizes: 'any' },
        { url: '/assets/icons/favicon.svg', type: 'image/svg+xml' },
        { url: '/assets/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [
        { url: '/assets/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      title: 'KNAPVÆRK',
      description: locale === 'en'
        ? 'KNAPVÆRK is a workshop working predominantly in wood. Handcrafted buttons using traditional methods.'
        : 'KNAPVÆRK er et værksted, der arbejder altovervejende i træ. Håndlavede knapper med traditionelle metoder.',
      type: 'website',
      url: 'https://www.knapvaerk.com',
      siteName: 'KNAPVÆRK',
      locale: locale === 'en' ? 'en_US' : 'da_DK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KNAPVÆRK',
      description: locale === 'en'
        ? 'Handcrafted wooden buttons using traditional methods'
        : 'Håndlavede træknapper med traditionelle metoder',
    },
    alternates: {
      canonical: locale === 'da' ? 'https://www.knapvaerk.com' : `https://www.knapvaerk.com/${locale}`,
      languages: {
        'da': 'https://www.knapvaerk.com',
        'en': 'https://www.knapvaerk.com/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          <ScrollProgress />
          <CookieConsent />
          <BackToTop />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
