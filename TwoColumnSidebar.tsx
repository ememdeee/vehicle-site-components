import React from 'react'
import SiteForm from './SiteForm'
import { PageNavigation } from './PageNavigation'
import CustomButton from './CustomButton'

interface TwoColumnSidebarProps {
  reportType?: string;
}

export function TwoColumnSidebar({ reportType }: TwoColumnSidebarProps) {
  return (
    <aside className="w-full bg-white py-6 px-3 sticky top-0">
      <div className="mb-6">
        <div className="relative">
          {reportType === 'COLOR' ? (
            <>
              <p className="text-lg font-semibold mb-2">Let&apos;s Find Your Color Code</p>
              <p className="text-sm text-gray-600 mb-4">Need your car&apos;s color code? Enter your VIN, and we&apos;ll find the perfect match for you.</p>
              <CustomButton text="Check Colors" href="#" fullWidth={true} />
            </>
          ) : (
            <SiteForm forceMobileLayout={true} />
          )}
        </div>
      </div>
      <PageNavigation />
    </aside>
  )
}