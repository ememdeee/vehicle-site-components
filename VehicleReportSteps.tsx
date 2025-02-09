import { Search, FilePlus, Eye, Check } from 'lucide-react'
import CustomButton from './CustomButton'

export default function VehicleReportSteps() {
  const steps = [
    { title: "Enter the VIN or Search by License Plate", description: "Locate your Vehicle Identification Number (VIN) or Licence plate number and enter it into our search bar.", icon: Search },
    { title: "Choose Your Report", description: "Select the type of report you need. Consider getting a window sticker for easy access to vehicle specifications and features.", icon: FilePlus },
    { title: "Review and Purchase", description: "Review the report preview and complete your purchase.", icon: Eye },
    { title: "Access Your Report", description: "Access your vehicle history report and print it easily via the website or our mobile app.", icon: Check },
  ]

  return (
    <section aria-labelledby="steps-heading">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h2 id="steps-heading" className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            How to get your Vehicle Reports?
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Getting a vehicle report is a breeze! Just enter the VIN to access car facts by VIN, including accident history and more. Our full vehicle history reports cover everything from specs and usage history to mileage readings, ensuring you have all the necessary information.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line that stops before the last icon */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-[44px] w-0.5 bg-blue-200 transform md:-translate-x-1/2" />

          <div className="relative space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-start group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex items-start md:w-1/2 md:justify-end md:pr-8">
                  <div 
                    className={`
                      absolute left-0 md:left-1/2 transform md:-translate-x-1/2
                      flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full 
                      ${index === steps.length - 1 ? 'bg-emerald-500' : 'bg-blue-600'}
                      text-white shadow-lg z-10 
                      flex items-center justify-center
                      transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-[360deg]
                    `}
                  >
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="hidden md:block w-full" />
                </div>
                <div 
                  className={`
                    pl-12 md:pl-0 md:w-1/2 
                    ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}
                  `}
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-800">
                    {`Step ${index + 1}: ${step.title}`}
                  </h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <CustomButton href='#' text='Check Vehicle History Now!'/>
        </div>
      </div>
    </section>
  )
}