import React from 'react'
import Link from 'next/link'

const makesList = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick',
  'Cadillac', 'Chevrolet', 'Chrysler', 'Daewoo', 'Datsun', 'Dodge', 'Ducati',
  'Eagle', 'Ferrari', 'FIAT', 'Forest River', 'Ford', 'Freightliner', 'Geo',
  'GMC', 'Harley-Davidson', 'Honda', 'HUMMER', 'Hyundai', 'Infiniti',
  'International', 'Isuzu', 'Jaguar', 'Jayco', 'Jeep', 'Kawasaki', 'Kenworth',
  'Kia', 'KTM', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Mack',
  'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 'Mercury', 'MINI',
  'Mitsubishi', 'Nissan', 'Oldsmobile', 'Opel', 'Peterbilt', 'Peugeot',
  'Plymouth', 'Polaris', 'Pontiac', 'Porsche', 'RAM', 'Rolls-Royce', 'Saab',
  'Saturn', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Triumph', 'Toyota',
  'Volkswagen', 'Volvo', 'Volvo Truck', 'Yamaha'
]

const statesList = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

const classicList = [
  '1969 Dodge Charger', '1967 Chevrolet Impala', '1955 Chevy Bel Air',
  '1958 Plymouth Fury', '1970 Monte Carlo', '1970 Plymouth Barracuda',
  '1965 Lincoln Continental', '1970 Plymouth Road Runner', '1951 Hudson Hornet',
  '1969 Pontiac GTO', '1963 Pontiac Tempest', '1940 Ford Coupe',
  '1970 Dodge Dart', '1969 Pontiac Firebird', '1970 Pontiac LeMans',
  '1969 Oldsmobile 442', '1967 Ford Galaxie 500', '1965 Buick Riviera',
  '1969 Ford Mustang', '1967 Mercury Cougar'
]

interface UrlListProps {
  urlPrefix?: string;
  dataSource?: string;
}

export default function UrlList({ urlPrefix = '/', dataSource = 'makesList' }: UrlListProps) {
  const data = 
    dataSource === 'makesList' ? makesList : 
    dataSource === 'statesList' ? statesList :
    dataSource === 'classicList' ? classicList :
    makesList; // default to makesList if an invalid dataSource is provided

  const columns = React.useMemo(() => {
    const itemsPerColumnLarge = Math.ceil(data.length / 4)
    const itemsPerColumnMedium = Math.ceil(data.length / 3)
    
    const largeColumns = Array.from({ length: 4 }, (_, i) => 
      data.slice(i * itemsPerColumnLarge, (i + 1) * itemsPerColumnLarge)
    )
    
    const mediumColumns = Array.from({ length: 3 }, (_, i) => 
      data.slice(i * itemsPerColumnMedium, (i + 1) * itemsPerColumnMedium)
    )

    return { largeColumns, mediumColumns }
  }, [data])

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">
          {dataSource === 'makesList' ? 'Other Makes' : 
           dataSource === 'statesList' ? 'Other States' : 
           dataSource === 'classicList' ? 'Top Classic Cars' : 
         'Other Items'}
        </h2>
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {columns.largeColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <ul className="space-y-2">
                {column.map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${urlPrefix ? `${urlPrefix}/` : ''}${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-blue-500 hover:underline text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 lg:hidden gap-6">
          {columns.mediumColumns.map((column, colIndex) => (
            <div key={colIndex}>
              <ul className="space-y-2">
                {column.map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${urlPrefix ? `${urlPrefix}/` : ''}${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-blue-500 hover:underline text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}