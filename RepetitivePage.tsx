import { notFound } from 'next/navigation'
import Head from 'next/head'
import HeroSection from '@/app/components/HeroSection'
import TwoColumnContainer from '@/app/components/TwoColumnContainer'
import Breadcrumb from '@/app/components/Breadcrumb'
import { TwoColumnSidebar } from '@/app/components/TwoColumnSidebar'
import UrlList from '@/app/components/url-list'
import SectionContent from './SectionContent'
import FAQBasic from './FAQBasic'
import ServiceList from './ServiceList'
import ClassicYmmSpecs from './ClassicYmmSpecs'
import SourceAndPartner from './SourceAndPartner'
import CheckOurBlog from './CheckOurBlog'
import SectionCta from './SectionCta'
import AuthorBox from './AuthorBox'
import Script from 'next/script'

interface Section {
  heading: string;
  headingLevel?: string;
  content: string;
}

interface DataSource {
  source: string;
  prefix: string;
}

interface HeroCta {
  text: string;
  link: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Author {
  name: string;
  url: string;
}

interface Content {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  imageUrl: string;
  author: Author;
  datePublished: string,
  dateModified: string,
  dataSources: DataSource[];
  reportType: string;
  heroForm: boolean;
  heroCta: HeroCta[];
  tags: string[];
  sections: Section[];
  faqs: FAQItem[];
}

interface RepetitivePageProps {
  contents: { [key: string]: Content };
  params: { page: string; make?: string };
}

function getContent(contents: { [key: string]: Content }, key: string): Content | null {
  return contents && contents[key] ? contents[key] : null
}

export function generateMetadata({ contents, params }: Pick<RepetitivePageProps, 'contents' | 'params'>) {
  const key = params.make || params.page
  const content = getContent(contents, key)
  if (!content) return {}

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: content.canonical,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      images: [
        {
          url: content.imageUrl,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
      type: 'article',
      siteName: 'ChassisVIN',
      locale: 'en_US',
      url: content.canonical,
      authors: content.author.name,
      publishedTime: content.datePublished,
      modifiedTime: content.dateModified,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [content.imageUrl],
    },
    authors: [{ name: content.author.name, url: content.author.url }],
    publishedTime: content.datePublished,
    modifiedTime: content.dateModified,
  }
}

export default function RepetitivePage({ contents, params }: RepetitivePageProps) {
  const key = params.make || params.page
  const content = getContent(contents, key)

  if (!content) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    author: {
      '@type': 'Person',
      name: content.author.name,
      url: content.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ChassisVin',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.chassisvin.com/ChassisVIN.png',
      },
    },
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    mainEntityOfPage: content.canonical,
    image: content.imageUrl,
    articleBody: content.description,
  }

  const renderSection = (section: Section, index: number) => {
    if (section.headingLevel === 'CTA') {
      return (
        <div className="content px-4 my-6" key={index}>
          <SectionCta text={section.heading} href={section.content} />
        </div>
      )
    }

    return (
      <div className="content px-4 py-2" key={index}>
        {renderHeading(section)}
        <SectionContent content={section.content} />
      </div>
    )
  }

  const renderHeading = (section: Section) => {
    switch (section.headingLevel) {
      case "h3":
        return <h3>{section.heading}</h3>
      case "h4":
        return <h4>{section.heading}</h4>
      case "CTA":
        return null
      case "h2":
      default:
        return <h2>{section.heading}</h2>
    }
  }

  const showClassicYmmSpecs = content.tags.some(tag => tag.toLowerCase().includes('spec'))
  const showSourceAndPartner = content.tags.some(tag => tag.toLowerCase().includes('partner'))
  const showServiceList = content.tags.some(tag => tag.toLowerCase().includes('service'))
  const showAuthorBox = content.tags.some(tag => tag.toLowerCase().includes('authorbox'))

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Head>
        <link rel="canonical" href={content.canonical} />
      </Head>
      <main>
        <HeroSection showForm={content.heroForm} title={content.title} description={content.description} reportType={content.reportType as 'VHR' | 'WS'} heroCta={content.heroCta} />
        <TwoColumnContainer>
          <div className='contentContainer'>
            <Breadcrumb />

            {content.sections && content.sections.length > 0 && content.sections.map((section, index) => renderSection(section, index))}

            {showClassicYmmSpecs && <ClassicYmmSpecs />}

            {showSourceAndPartner && <SourceAndPartner />}
            
            {content.dataSources && content.dataSources.length > 0 && content.dataSources.map((dataSource, index) => (
              dataSource.source && dataSource.source.trim() !== "" && (
                <UrlList 
                key={`${dataSource.source}-${index}`}
                dataSource={dataSource.source} 
                urlPrefix={dataSource.prefix} 
                />
              )
            ))}
            
            {showServiceList && <ServiceList />}
            
            {showAuthorBox && <AuthorBox authorName='Ethan J. Caldwell' />}
            
            {content.faqs && content.faqs.length > 0 && (
              <FAQBasic title="Frequently Asked Questions" items={content.faqs} />
            )}
            <CheckOurBlog />
          </div>
          <TwoColumnSidebar reportType={content.reportType} />
        </TwoColumnContainer>
      </main>
    </>
  )
}