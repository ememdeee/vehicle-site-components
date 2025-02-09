import React from 'react'
import CustomButton from './CustomButton'

const InfoSection: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 md:px-0 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Do You Need to Check a Vehicle&apos;s History?
        </h2>
        <div className="space-y-4">
          <p>
            Did you know that buyers are{' '}
            <span className="text-blue-600 font-semibold">75% less likely to face major issues</span> after purchase
            when they check a vehicle&apos;s history? A history check allows them to easily identify
            hidden accidents or title problems, view market value for{' '}
            <span className="text-blue-600 font-semibold">better negotiations</span>, and save money
            in the long run.
          </p>
          <p>
            Sellers also benefit. Vehicles with detailed history checks and window stickers tend to{' '}
            <span className="text-blue-600 font-semibold">sell 15% higher and more quickly</span>. When customers
            see vehicle specifications, features, options, and packages on window stickers, they are
            less likely to contest pricing, leading to faster sales.
          </p>
        </div>
        <div className="mt-8 text-center">
          <CustomButton text="View Sample Report" href="/sample" />
        </div>
      </div>
    </section>
  )
}

export default InfoSection