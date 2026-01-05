import './globals.css'
import PageLoader from '../components/PageLoader'
import ScrollProgress from '../components/ScrollProgress'

export const metadata = {
  title: 'KNAPVÆRK',
  description: 'Knapværk – eksklusivt modebrand med håndlavede værker af høj kvalitet. Oplev udvalgte værker og håndværk her.',
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
    description: 'Oplev Knapværks udvalgte værker og håndværk. Luksusdesign med æstetik og kvalitet i fokus.',
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
        {children}
      </body>
    </html>
  )
}