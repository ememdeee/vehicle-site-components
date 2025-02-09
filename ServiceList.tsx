import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Printer, Car, Search, FileSearch, Clock, FileText, Store, Shield, Palette, Compass, AlertTriangle } from 'lucide-react'
import Link from "next/link"

export default function ServiceList() {
  const services = [
    {
      title: "Window Sticker",
      description: "Print window sticker for your vehicle",
      icon: Printer,
      path: "/window-sticker",
    },
    {
      title: "VIN Decoder",
      description: "Decode any vehicle manufacturer",
      icon: Car,
      path: "/vin-decoder",
    },
    {
      title: "Classic VIN Lookup",
      description: "Decode VINs for classic and vintage vehicles",
      icon: Clock,
      path: "/classic-lookup",
    },
    {
      title: "License Plate Lookup",
      description: "Search license plate information",
      icon: Search,
      path: "/license-plate-lookup",
    },
    {
      title: "VIN Check",
      description: "Decode any vehicle in US states",
      icon: FileSearch,
      path: "/vin-check",
    },
    {
      title: "Build Sheet by VIN",
      description: "Get detailed build sheet for your vehicle",
      icon: FileText,
      path: "/build-sheet-by-vin",
    },
    {
      title: "Dealers",
      description: "Unlimited vehicle history reports",
      icon: Store,
      path: "/unlimited-vehicle-history-reports",
    },
    {
      title: "Paint Code by VIN",
      description: "Find your vehicle's exact paint color code",
      icon: Palette,
      path: "/paint-code-by-vin",
    },
    {
      title: "VIN Explorer",
      description: "Explore detailed vehicle information by VIN",
      icon: Compass,
      path: "/vin-explorer",
    },
    {
      title: "Warranty Check",
      description: "Check warranty information by VIN",
      icon: Shield,
      path: "/warranty-by-vin",
    },
    {
      title: "Vehicle Recalls",
      description: "Understanding Vehicle Recalls: A Complete Guide",
      icon: AlertTriangle,
      path: "/vehicle-recalls",
    },
  ]

  return (
    <section className="bg-white">
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-left">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Link href={service.path} key={index} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-md border-blue-100 overflow-hidden">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <service.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}