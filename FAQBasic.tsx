'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Plus, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  items: FAQItem[]
  style?: 'default' | 'style2'
}

export default function FAQBasic({ title, items, style = 'default' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const setAnswerRef = useCallback((el: HTMLDivElement | null, index: number) => {
    answerRefs.current[index] = el
  }, [])

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section id='faq-section' className={`w-full mx-auto [&:not(#breadcrumb+&)]:py-12 [#breadcrumb+&]:pt-0 [#breadcrumb+&]:pb-12 px-4 ${style === 'default' ? 'max-w-4xl' : ''}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="text-center mb-8">
        {style === 'default' && (
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-gray-500" />
          </div>
        )}
        <h2 className={`text-3xl font-bold ${style === 'style2' ? 'text-left' : ''}`}>{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              <Plus
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? 'transform rotate-45' : ''
                }`}
              />
            </button>
            <div
              ref={(el) => setAnswerRef(el, index)}
              id={`faq-answer-${index}`}
              className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: openIndex === index ? answerRefs.current[index]?.scrollHeight + 'px' : '0px',
                opacity: openIndex === index ? 1 : 0
              }}
            >
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}