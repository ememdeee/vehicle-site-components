import React from 'react'
import Image from 'next/image'
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react'

const stats = [
  { icon: ThumbsUp, value: '98%', label: 'Satisfaction rate' },
  { icon: MessageSquare, value: '10 minutes', label: 'Avg. response time' },
  { icon: Clock, value: '24/7', label: 'Chat Availability' },
]

export default function CustomerSupport() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center -space-x-4 mb-8">
            <Image
              src='/customers-support.webp'
              alt='Customers Support'
              width={250}
              height={94}
              className="rounded-full border-4 border-white"
            />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Dedicated Customer Support: We&apos;re Here to Help
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Our support team is always ready to assist you. Simply drop us a message, and we&apos;ll promptly respond to ensure a seamless experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <stat.icon className="w-12 h-12 text-blue-500 mb-4" />
              <span className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}