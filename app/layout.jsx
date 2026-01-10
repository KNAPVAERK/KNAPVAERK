import './globals.css'
import PageLoader from '../components/PageLoader'
import ScrollProgress from '../components/ScrollProgress'
import CookieConsent from '../components/CookieConsent'
import BackToTop from '../components/BackToTop'

export const metadata = {
  title: 'KNAPVÆRK | Håndlavede knapper',
  description: 'KNAPVÆRK er et værksted, der arbejder altovervejende i træ. Alle knapper begynder og slutter ved materialets struktur, styrker og begrænsninger. Arbejdet udføres med traditionelle metoder.',
  keywords: 'Knapværk, modebrand, håndlavede knapper, design, eksklusivt',
  authors: [{ name: 'Knapværk ApS' }],
  manifest: '/assets/icons/site.webmanifest',
  themeColor: '#f7f6f4',
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
    description: 'KNAPVÆRK er et værksted, der arbejder altovervejende i træ. Håndlavede knapper med traditionelle metoder.',
    type: 'website',
    url: 'https://www.knapvaerk.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <PageLoader />
        <ScrollProgress />
        <CookieConsent />
        <BackToTop />
        {children}
      </body>
    </html>
  )
}