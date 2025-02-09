import React from 'react'
import SiteForm from './SiteForm'

export default function OfferBanner() {
  return (
    <section className="w-full bg-white py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/offer-banner.webp')" }}>
          <div className="bg-gradient-to-r from-blue-100/95 to-blue-100/80 sm:to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 max-w-[700px]">
                  <h2 className="text-4xl font-bold mb-2">
                    Starting from <span className="text-blue-500">$0.07*</span>
                  </h2>
                  <h3 className="text-2xl font-semibold mb-4">
                    for a vehicle history report
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Verify the VIN number and gain valuable insights before buying
                    a used car. Get started today for peace of mind and confidence
                    in your investment.
                  </p>
                  <SiteForm />
                  <p className="text-xs text-gray-500">
                    * This price is available with a trial subscription to our Unlimited Vehicle History Reports package.
                  </p>
                </div>
                <div>
                  {/* Empty column for spacing */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}