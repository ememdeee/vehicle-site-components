import { DollarSign, Database, Globe, Gavel } from 'lucide-react'
import CustomButton from './CustomButton'

export default function WhatSetsUsApart() {
  const features = [
    {
      title: "Unbeatable Prices",
      description: "We offer the lowest prices in the industry! While others charge a fortune, we keep history reports 100% affordable.",
      icon: DollarSign,
      bgColor: "bg-blue-100",
    },
    {
      title: "Exclusive Sales Data",
      description: "View over 70 million unique sales records—data you won't find anywhere else. Make informed decisions with confidence!",
      icon: Database,
      bgColor: "bg-blue-100",
    },
    {
      title: "Worldwide VIN Coverage",
      description: "Our vehicle history lookup tool covers VINs from around the globe, giving you access to vehicle histories that other competitors can't match.",
      icon: Globe,
      bgColor: "bg-blue-100",
    },
    {
      title: "Auction Records that tell ALL",
      description: "If a vehicle's been through an auction, we've got the details! From sale prices to damages and up to 10 photos, we provide the inside scoop you need.",
      icon: Gavel,
      bgColor: "bg-blue-100",
    },
  ]

  return (
    <section className="bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Sets Us Apart?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Getting a vehicle report is a breeze! Just enter the VIN to access car facts by VIN, including accident history and more. Our full vehicle history reports cover everything from specs and usage history to mileage readings, ensuring you have all the necessary information.
          </p>
        </div>
    
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`${feature.bgColor} rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105`}>
              <div className="flex items-center mb-4">
                <feature.icon className="w-8 h-8 mr-3 text-gray-700" />
                <h3 className="text-2xl font-semibold text-gray-700">{feature.title}</h3>
              </div>
              <p className="text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <CustomButton href='#' text='Check Vehicle History Now!'/>
        </div>
      </div>
    </section>
  )
}