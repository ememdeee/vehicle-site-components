'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Head from 'next/head'

const Breadcrumb = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => ({
      label: formatSegment(segment),
      href: `/${pathSegments.slice(0, index + 1).join('/')}`
    }))
  ]

  function formatSegment(segment: string): string {
    return segment
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chassisvin.com'}${item.href}`,
        "name": item.label
      }
    }))
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </Head>
      <nav id='breadcrumb' aria-label="Breadcrumb" className="text-sm px-4 pb-6 md:pb-8">
        <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbItems.map((item, index) => (
            <li 
              key={item.href} 
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-blue-500 mx-2" aria-hidden="true" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-700" itemProp="name">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-blue-500 hover:underline" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumb