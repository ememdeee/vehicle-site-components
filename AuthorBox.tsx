import Image from 'next/image'
import { Twitter, Linkedin } from 'lucide-react'
import authors from '@/data/authors.json'
import CustomButton from './CustomButton'

interface AuthorBoxProps {
  authorName: string
}

export default function AuthorBox({ authorName }: AuthorBoxProps) {
  const author = Object.values(authors).find(a => a.fullName === authorName)

  if (!author) {
    return null
  }

  const authorSlug = Object.keys(authors).find(key => authors[key as keyof typeof authors].fullName === authorName)

  return (
    <div className="border border-gray-200 rounded-lg p-6 mt-8 bg-gradient-to-br from-blue-50 to-white shadow-md mx-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <Image
            src={author.image}
            alt={author.fullName}
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-800">{author.fullName}</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{author.bio}</p>
          <div className="mt-4 flex justify-center sm:justify-start space-x-4">
            <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Twitter size={20} />
            </a>
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center sm:text-left">
        <CustomButton href={`/author/${authorSlug}`} text='View Full Profile' />
      </div>
    </div>
  )
}