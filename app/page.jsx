import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import GallerySection from '../components/GallerySection'
import AboutSection from '../components/AboutSection'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { getGallerySections, getSiteSettings, getPageContent } from '../lib/sanity'
import { urlFor } from '../lib/sanity'

// This is a Server Component - data fetching happens at build time
export default async function Home() {
  // Fetch data from Sanity
  // On first build, these might be empty - that's fine!
  const gallerySections = await getGallerySections().catch(() => [])
  const siteSettings = await getSiteSettings().catch(() => null)
  const aboutContent = await getPageContent('om').catch(() => null)

  // Hardcoded fallback data for initial deployment
  const worksSection = gallerySections.find(s => s.slug?.current === 'works') || {
    title: 'Udvalgte værker',
    subtitle: 'Hver genstand fortæller en historie om præcision, materialekendskab og dedikation til håndværket.',
    metaText: 'Håndlavet i Danmark',
    images: []
  }

  const craftSection = gallerySections.find(s => s.slug?.current === 'craft') || {
    title: 'Håndværk',
    subtitle: 'Arbejdet udføres med traditionelle metoder og primært håndværktøj. Træet udvælges enkeltvis og bearbejdes med fokus på fiberretning, densitet og overflade.',
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
          images={craftSection.images}
          sectionNumber="02"
        />

        <AboutSection
          data={aboutContent ? {
            title: aboutContent.heading || aboutContent.pageTitle,
            content: aboutContent.body?.map(block =>
              block.children?.map(child => child.text).join('')
            ).join('\n\n') || aboutContent.subheading,
            image: aboutContent.image ? urlFor(aboutContent.image).width(800).height(1000).url() : null
          } : null}
        />

        <ContactForm />
      </div>

      <Footer 
        brandName={siteSettings?.title || "KNAPVÆRK"}
        cvrNumber={siteSettings?.cvrNumber || "40292195"}
        address={siteSettings?.address || "Stavrevej 512, 5300 Kerteminde"}
      />
    </>
  )
}

// Generate static params for build
export async function generateStaticParams() {
  return []
}

// Revalidate every hour (optional - for when you want fresh data)
export const revalidate = 3600