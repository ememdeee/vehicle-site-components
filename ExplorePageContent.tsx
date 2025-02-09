import Link from 'next/link';
import AutoContent from './AutoContent';
import HeroSection from './HeroSection';
import Breadcrumb from './Breadcrumb';
import FAQBasic from './FAQBasic';
import TrustBadges from './TrustBadges';

interface ExplorePageContentProps {
  title: string;
  description: string;
  make?: string;
  model?: string;
  year?: number;
  listItems?: Array<{ name: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>; // Add faqs prop
}

export default function ExplorePageContent({
  title,
  description,
  make,
  model,
  year,
  listItems,
  faqs
}: ExplorePageContentProps) {
  return (
    <main>
      <HeroSection title={title} description={description} />
      <div className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          <div className='px-4'>
            <AutoContent make={make} model={model} year={year} content={false} />
            {listItems && listItems.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {listItems.map((item) => (
                  <li key={item.name} className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-200">
                    <Link href={item.href} className="block p-4 text-gray-800 hover:text-blue-600">
                     <span className="text-lg font-semibold">
                        {make && `${make} `}
                        {model && `${model} `}
                        {year && `${year} `}
                        {item.name}
                        {" VIN Lookup"}
                      </span>
                      <span className="block mt-1 text-sm text-blue-500">View details</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <AutoContent make={make} model={model} year={year} content={true} />
          </div>
          <div className='pt-4'>
            <TrustBadges/>
          </div>

          {faqs && faqs.length > 0 && (
            <FAQBasic title="Frequently Asked Questions" items={faqs} style='style2' />
          )}
        </div>
      </div>
    </main>
  );
}
