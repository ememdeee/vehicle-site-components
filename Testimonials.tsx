'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import CustomButton from './CustomButton'

interface Testimonial {
  name: string
  image: string
  rating: number
  text: string
  carSaved: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Randy C',
    image: '/Randy-C.webp',
    rating: 5,
    text: "I was looking to buy a car and got a few options from a dealer. I didn't know what to start with looking into car specifications and title history, but ClearVin vehicle rating and fair car pricing helped me to make the right decision. Great job!",
    carSaved: 'Park Hills, MO'
  },
  {
    name: 'Antonio A.',
    image: '/Antonio-A.webp',
    rating: 4,
    text: "I called a guy with a car for sale and it sounded like a good deal. I asked him for the VIN so I could check it out before driving all the way to his place to look at it. He wouldn't give it to me. That sent up a red flag. I figured there was something he was trying to hide. I never buy a used car without running a VIN check first and I always use ClearVin.",
    carSaved: 'Fort Stockton, TX'
  },
  {
    name: 'Daniel S.',
    image: '/Daniel-S.webp',
    rating: 5,
    text: "I was considering buying a really posh car that I was really into from a private seller, but then the vehicle check suddenly indicated a lien. ClearVin saved me from being involved in the hassle with the third party. Extremely useful service! After reading the ClearVin report I felt more confident buying it.",
    carSaved: 'Summersville, KY'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        nextTestimonial()
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500)
    setIsAutoPlaying(false)
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 mb-2">98% POSITIVE FEEDBACK</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Stories, Real Savings</h2>
          <p className="text-xl text-gray-700">Discover how ChassisVIN has helped customers make informed decisions and avoid costly mistakes.</p>
        </div>

        <div className="relative">
          <div
            className={`flex flex-col md:flex-row items-center gap-8 transition-opacity duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{testimonials[currentIndex].name}</h3>
                  <div className="flex">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-600">{testimonials[currentIndex].carSaved}</p>
                <CustomButton text="Next Story" onClick={nextTestimonial} />
              </div>
            </div>

            <div className="w-full md:w-1/3 space-y-4">
              <div className="bg-blue-500 text-white rounded-lg p-6">
                <h4 className="text-2xl font-bold mb-2">4.5 / 5</h4>
                <p className="text-sm">Average Customer Rating</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white text-white" />
                  ))}
                </div>
              </div>
              <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
                <h4 className="text-2xl font-bold mb-2">10,000+</h4>
                <p className="text-sm">Customers Helped</p>
              </div>
              <div className="bg-gray-100 text-gray-900 rounded-lg p-6">
                <h4 className="text-2xl font-bold mb-2">$5M+</h4>
                <p className="text-sm">Saved in Potential Losses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}