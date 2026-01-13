import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Hero from '../../components/Hero'
import GallerySection from '../../components/GallerySection'
import AboutSection from '../../components/AboutSection'
import ContactForm from '../../components/ContactForm'
import Footer from '../../components/Footer'
import { getGallerySections, getSiteSettings, getPageContent, getContactSection } from '../../lib/sanity'

// This is a Server Component - data fetching happens at build time
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Fetch data from Sanity with locale
  const gallerySections = await getGallerySections(locale).catch(() => [])
  const siteSettings = await getSiteSettings().catch(() => null)
  const aboutContent = await getPageContent('om', locale).catch(() => null)
  const contactContent = await getContactSection(locale).catch(() => null)

  // Fallback data for initial deployment
  const defaultWorksSection = {
    da: {
      title: 'Udvalgte værker',
      subtitle: 'Hver genstand fortæller en historie om præcision, materialekendskab og dedikation til håndværket.',
      metaText: 'Håndlavet i Danmark',
    },
    en: {
      title: 'Selected Works',
      subtitle: 'Each piece tells a story of precision, material knowledge and dedication to craftsmanship.',
      metaText: 'Handmade in Denmark',
    }
  }

  const defaultCraftSection = {
    da: {
      title: 'Håndværk',
      subtitle: 'Arbejdet udføres med traditionelle metoder og primært håndværktøj. Træet udvælges enkeltvis og bearbejdes med fokus på fiberretning, densitet og overflade.',
    },
    en: {
      title: 'Craft',
      subtitle: 'Work is carried out using traditional methods and primarily hand tools. The wood is selected individually and processed with focus on grain direction, density and surface.',
    }
  }

  const worksSection = gallerySections.find((s: any) => s.slug?.current === 'works') || {
    ...defaultWorksSection[locale as keyof typeof defaultWorksSection] || defaultWorksSection.da,
    images: []
  }

  const craftSection = gallerySections.find((s: any) => s.slug?.current === 'craft') || {
    ...defaultCraftSection[locale as keyof typeof defaultCraftSection] || defaultCraftSection.da,
    images: []
  }

  return (
    <>
      <Navigation />

      <div className="content-wrapper">
        <Hero />

        <GallerySection
          id="works"
          title={worksSection.title}
          subtitle={worksSection.subtitle}
          metaText={worksSection.metaText}
          images={worksSection.images}
          sectionNumber="01"
        />

        <GallerySection
          id="craft"
          title={craftSection.title}
          subtitle={craftSection.subtitle}
          metaText={craftSection.metaText || ''}
          images={craftSection.images}
          sectionNumber="02"
        />

        <AboutSection
          data={aboutContent ? {
            title: aboutContent.heading || aboutContent.pageTitle,
            content: aboutContent.body?.map((block: any) =>
              block.children?.map((child: any) => child.text).join('')
            ).join('\n\n') || aboutContent.subheading,
            image: aboutContent.image || null
          } : null}
        />

        <ContactForm data={contactContent} />
      </div>

      <Footer
        brandName={siteSettings?.title || "KNAPVÆRK"}
        cvrNumber={siteSettings?.cvrNumber || "40292195"}
        address={siteSettings?.address || "Stavrevej 512, 5300 Kerteminde"}
      />
    </>
  )
}

// Revalidate every hour (optional - for when you want fresh data)
export const revalidate = 3600
