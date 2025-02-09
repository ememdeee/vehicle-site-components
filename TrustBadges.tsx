import Image from 'next/image'

const badges = [
  { src: '/nmvtis-logo.webp', alt: 'NMVTIS Logo' },
  { src: '/safecar-logo.webp', alt: 'Safer Car Logo' },
  { src: '/nhtsa-logo.webp', alt: 'NHTSA Logo' },
]

export default function TrustBadges() {
  return (
    <div className="bg-white p-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {badges.map((badge) => (
          <div key={badge.alt} className="w-40 h-12 relative">
            <Image
              src={badge.src}
              alt={badge.alt}
              fill
              sizes="(max-width: 640px) 100vw, 160px"
              style={{ objectFit: 'contain', filter: 'grayscale(100%)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}