import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const items = [
  {
    name: "National Vehicle Service (NVS)",
    logo: "/nmvtis-logo.webp",
    description: "The nation's leader in providing unique vehicle theft, fraud, and asset protection solutions. NVS information includes vehicle impound data, export data, and vehicle theft and recovery data.",
    link: "https://nvs.gov/",
    rel: "noopener noreferrer"
  },
  {
    name: "National Highway Traffic Safety Administration (NHTSA)",
    logo: "/nhtsa-logo.webp",
    description: "Government agency managing traffic safety across the US. NHTSA aggregates information on vehicle safety complaints, airbag deployments, odometer fraud, and vehicle safety recalls.",
    link: "https://www.nhtsa.gov/",
    rel: "noopener noreferrer"
  },
  {
    name: "Monroney Label",
    logo: "/monroney-label-logo.webp",
    description: "In partnership with MonroneyLabels.com, we offer reliable and efficient solutions for accurate window stickers by VIN, displaying important vehicle information.",
    link: "https://monroneylabels.com/",
    rel: "noopener noreferrer"
  },
  {
    name: "Black Book",
    logo: "/blackbook-logo.webp",
    description: "Specializes in VIN-specific valuations and insights, helping identify vehicles with lower risks and higher potential profitability through statistical analysis and historical valuation data.",
    link: "https://www.blackbook.com/",
    rel: "noopener noreferrer"
  },
  {
    name: "ChassisVIN",
    logo: "/ChassisVIN.webp",
    description: "Provides comprehensive vehicle history reports and VIN decoding services, offering detailed information about a vehicle's past and specifications.",
    link: "https://www.chassisvin.com/",
    rel: "noopener"
  },
  {
    name: "Auto VIN Lookup",
    logo: "/auto-vin-lookup-logo.webp",
    description: "Offers comprehensive vehicle history reports and VIN lookup services for thorough vehicle background checks.",
    link: "https://autovinlookup.com/",
    rel: "noopener"
  },
  {
    name: "Toyota VIN Decoder",
    logo: "/toyota-vin-decoder-logo.webp",
    description: "Specialized service for decoding Toyota vehicle identification numbers, providing detailed vehicle specifications and history.",
    link: "https://toyotavindecoder.com/",
    rel: "noopener"
  },
  {
    name: "ClearVIN",
    logo: "/clearvin-logo.webp",
    description: "Provides comprehensive vehicle history reports by aggregating data from multiple trusted sources to give you the most complete picture of a vehicle's history.",
    link: "https://www.clearvin.com/?a_aid=b3a49a62",
    rel: "noopener noreferrer"
  }
]

export default function SourceAndPartner() {
  return (
    <div className="w-full py-12">
      <div className="px-4">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Our Data Sources & Partners</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="w-full h-24 relative mb-4">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                <Link
                  href={item.link}
                  className="text-primary hover:underline mt-4 inline-block"
                  target="_blank"
                  rel={item.rel}
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}