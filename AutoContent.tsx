interface AutoContentProps {
  make?: string;
  model?: string;
  year?: number;
  content?: boolean;
}

export default function AutoContent({ make, model, year, content = true }: AutoContentProps) {
  if (content) {
    if (year) return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{make} {model} {year} VIN Lookup, Check Full Vehicle History and specs. </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Use a free VIN decoder <a href="/" className="text-blue-500">here</a> to uncover details about the {make} {model} {year}. For bulk access to VIN checks, <a href="/vin-check" className="text-blue-500">sign up for VIN checks</a> or a <a href="/unlimited-vehicle-history-reports" className="text-blue-500">dealer VIN lookup</a> and enjoy discounted reports.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our {make} {model} {year} VIN decoder provides accurate, up-to-date information, including recalls, defects, odometer readings, auction history, and more, helping you make informed decisions. No VIN? Use our <a href="/license-plate-lookup" className="text-blue-500">License Plate Lookup</a> tools.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          With a reliable <a href="/vin-decoder" className="text-blue-500">VIN decoder</a> and <a href="/window-sticker" className="text-blue-500">Window Sticker</a>/<a href="/build-sheet-by-vin" className="text-blue-500">Build Sheet</a>, you can access essential data from global automotive databases, empowering you to make well-informed decisions when purchasing used vehicles, managing fleets, or assessing repair needs.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Running a VIN check eliminates uncertainty by providing a detailed history of the vehicle, drawing data from trusted sources like NMVTIS and NHTSA for a comprehensive report.
        </p>
      </div>
    );
    if (model) return (
      <div className="content mt-8">
        <h2 className="text-2xl font-bold mb-4">Check {make} {model} VIN and Vehicle History Reports</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every {make} {model} vehicle has a unique 17-character VIN (Vehicle Identification Number), serving as its fingerprint. This alphanumeric code reveals key details like manufacturer, production year, assembly plant, engine type, model, and more. Use it to access the <a href="/build-sheet-by-vin" className="text-blue-500">build sheet</a> or sign up for <a href="/unlimited-vehicle-history-reports" className="text-blue-500">bulk dealer VIN lookups</a> for discounted reports.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          A reliable <a href="/vin-decoder" className="text-blue-500">VIN decoder</a> and <a href="/window-sticker" className="text-blue-500">Window Sticker</a>/<a href="/build-sheet-by-vin" className="text-blue-500">Build Sheet</a>, you can access essential data from global automotive databases, empowering you to make well-informed decisions when purchasing used vehicles, managing fleets, or assessing repair needs.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">With our {make} {model} VIN Decoder, you can</p>
        <ul className="list-disc pl-5 mt-2 mb-4">
          <li>Access Vehicle History: Check for theft, damage, or odometer fraud.</li>
          <li>View Vehicle Specifications: Get the original build sheet with all factory options.</li>
          <li>Retrieve <a href="/window-sticker" className="text-blue-500">Window Sticker</a> Information: Find original features and pricing.</li>
          <li>Find {make} {model} Parts: Source parts using your VIN.</li>
          <li>Track Recalls & Records: Stay updated on safety recalls and service history.</li>
          <li>Use <a href="/license-plate-lookup" className="text-blue-500">License Plate Lookup</a>: Access vehicle reports even without a VIN.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          Standardized by ISO, the VIN system ensures global transparency. Our powerful tool decodes any {make} {model} VIN, offering insights into original equipment, configurations, and design, including colors, interiors, and wheels.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Uncover the unique features of your vehicle with our {make} {model} VIN Decoder for a complete and confident ownership experience.
        </p>
      </div>
    );
    if (make) return (
      <div className="mt-8">
        <div className="content">
          <h2 className="text-2xl font-bold mb-4">Check {make} VIN and Vehicle History Reports</h2>
          <p className="text-gray-700 leading-relaxed">
            Every {make} vehicle comes with a unique identifier called a Vehicle Identification Number (VIN), much like a car’s fingerprint. This 17-character alphanumeric code provides crucial information about your vehicle, including the manufacturer, year of production, plant of assembly, engine type, model, and more. The VIN also allows a user to get a build sheet of {make}. If you’re looking for a bulk access, just sign up for <a href="/unlimited-vehicle-history-reports" className="text-blue-500 underline">dealer VIN lookup</a> to get VIN check reports at deep discount.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With our <a href="/vin-decoder" className="text-blue-500 underline">{make} VIN Decoder</a>, you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed my-4">
            <li><strong>Access Vehicle History</strong>: Validate the car’s history to ensure it hasn’t been stolen, damaged, or involved in odometer fraud.</li>
            <li><strong>Check Vehicle Specifications</strong>: Get detailed information about the vehicle’s original <a href="/build-sheet-by-vin" className="text-blue-500 underline">build sheet</a>, including all factory-installed options and specifications.</li>
            <li><strong>Explore Window Sticker Information</strong>: Retrieve the original <a href="/window-sticker" className="text-blue-500 underline">window sticker by VIN</a> for added details on features and pricing.</li>
            <li><strong>Find {make} Parts</strong>: Quickly identify and source {make} parts based on your VIN.</li>
            <li><strong>Track Safety Recalls and Service Records</strong>: Stay updated on any safety recalls, theft records, or title brand history.</li>
            <li><strong>Use License Plate Lookup</strong>: Don’t have a VIN? Use our <a href="/license-plate-lookup" className="text-blue-500 underline">license plate lookup</a> to access vehicle reports and window sticker information.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Originally standardized by the ISO institute, the VIN system is used globally to ensure transparency and accessibility of vehicle information. With our powerful online tools, you can decode any {make} VIN and make informed decisions about your vehicle.
          </p>
          <p className="text-gray-700 leading-relaxed my-4">
            Our {make} VIN Decoder goes beyond basic details to provide a comprehensive view of your vehicle&apos;s unique features and configurations. For instance, it can reveal original equipment, packages, and specifications specific to your {make}. You can even access detailed configuration images, showcasing exterior colors, interior designs, wheel styles, and other distinctive attributes—a virtual glimpse into your vehicle’s original design.
          </p>
          <h3 className="text-xl font-semibold">Why Use a VIN Decoder?</h3>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li><strong>Protect Used Car Buyers:</strong> For individuals, a VIN lookup uncovers a car&apos;s past, from odometer readings to accident reports, protecting you from hidden issues like odometer fraud or undisclosed damages.</li>
            <li><strong>Support Auto Shops and Professionals:</strong> Mechanics can use VIN data to access vital safety information, service records, and manufacturer specifications, streamlining diagnostics and ensuring accurate repairs.</li>
            <li><strong>Track and Recover Stolen Vehicles:</strong> Law enforcement agencies leverage VINs to identify stolen cars and prevent the circulation of illegally acquired vehicles, safeguarding consumers from fraudulent purchases.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            By decoding a VIN, you not only demystify a vehicle&apos;s history but also safeguard your investments, enhance safety, and reduce the risk of costly surprises. Whether you&apos;re a buyer, seller, or automotive professional, understanding and using VIN information ensures smarter choices at every turn. If you’re looking for bulk access, just sign up for <a href="/unlimited-vehicle-history-reports" className="text-blue-500 underline">dealer VIN lookup</a> to get VIN check reports at deep discounts.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you&apos;re verifying listed features or exploring the finer details of your car, our decoder ensures transparency and confidence in every aspect of ownership. Simply enter your {make} VIN and unlock a deeper understanding of what makes your vehicle special.
          </p>
        </div>
      </div>
    );
    else return (
      <div className="mt-8">
        <div className="content mb-4">
          <h2 className="text-2xl font-bold mb-4">Explore VIN and Vehicle History Reports</h2>
          <p className="text-gray-700 leading-relaxed">
            A VIN (Vehicle Identification Number) serves as a vehicle&apos;s unique fingerprint, offering a wealth of information that enhances safety, transparency, and peace of mind for used car buyers and industry professionals alike. Introduced by the National Motor Vehicle Title Information System (NMVTIS) and standardized in 1981, VINs hold the key to detailed vehicle history reports, including ownership records, accident history, and <a href="/vehicle-recalls" className="text-blue-500 underline">recalls</a>. With a reliable <a href="/vin-decoder" className="text-blue-500 underline">VIN decoder</a>, <a href="/window-sticker" className="text-blue-500 underline">Window Sticker</a>, or <a href="/build-sheet-by-vin" className="text-blue-500 underline">Build Sheet</a>, you can access essential data from global automotive databases, empowering you to make well-informed decisions when purchasing used vehicles, managing fleets, or assessing repair needs.
          </p>
        </div>
        <div className="content">
          <h3 className="text-xl font-semibold">Why Use a VIN Decoder?</h3>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li><strong>Protect Used Car Buyers:</strong> For individuals, a VIN lookup uncovers a car&apos;s past, from odometer readings to accident reports, protecting you from hidden issues like odometer fraud or undisclosed damages.</li>
            <li><strong>Support Auto Shops and Professionals:</strong> Mechanics can use VIN data to access vital safety information, service records, and manufacturer specifications, streamlining diagnostics and ensuring accurate repairs.</li>
            <li><strong>Track and Recover Stolen Vehicles:</strong> Law enforcement agencies leverage VINs to identify stolen cars and prevent the circulation of illegally acquired vehicles, safeguarding consumers from fraudulent purchases.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            By decoding a VIN, you not only demystify a vehicle&apos;s history but also safeguard your investments, enhance safety, and reduce the risk of costly surprises. Whether you&apos;re a buyer, seller, or automotive professional, understanding and using VIN information ensures smarter choices at every turn. If you’re looking for bulk access, just sign up for <a href="/unlimited-vehicle-history-reports" className="text-blue-500 underline">dealer VIN lookup</a> to get VIN check reports at deep discounts.
          </p>
        </div>
      </div>
    );
  } else {
    if (year) return <h2 className="text-3xl font-bold mb-8">{year} {make} {model} VIN Lookup and Vehicle History Reports</h2>;
    if (model) return <h2 className="text-3xl font-bold mb-8">{make} {model} VIN Lookup and Vehicle History Reports by Year</h2>;
    if (make) return <h2 className="text-3xl font-bold mb-8">{make} VIN Lookup and Vehicle History Reports by Model</h2>;
    else return <h2 className="text-3xl font-bold mb-8">Search Car History by Make:</h2>;
  }
}