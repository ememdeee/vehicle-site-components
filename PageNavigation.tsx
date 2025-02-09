'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavItem {
  name: string;
  href: string;
}

export function PageNavigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([])

  useEffect(() => {
    const h2Elements = document.querySelectorAll('h2')
    const items: NavItem[] = Array.from(h2Elements).map((h2, index) => {
      const id = h2.id || `section-${index}`
      if (!h2.id) h2.id = id
      return {
        name: h2.textContent || `Section ${index + 1}`,
        href: `#${id}`,
      }
    })
    setNavItems(items)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav>
      <p className="text-lg font-semibold mb-4">Navigation</p>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}