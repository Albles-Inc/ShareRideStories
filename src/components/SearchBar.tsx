'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  size?: 'large' | 'medium'
  onSearch?: (plateNumber: string) => void
}

export default function SearchBar({ 
  placeholder = "Enter license plate (e.g. GR-1234-24)",
  size = 'large',
  onSearch
}: SearchBarProps) {
  const [searchPlate, setSearchPlate] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (!searchPlate.trim()) return
    
    const plate = searchPlate.toUpperCase()
    
    if (onSearch) {
      onSearch(plate)
    } else {
      router.push(`/search?plate=${encodeURIComponent(plate)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const inputClasses = size === 'large' 
    ? "w-full px-6 py-4 text-lg text-center border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm text-black"
    : "w-full px-4 py-3 text-base text-center border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm text-black"

  const buttonClasses = size === 'large'
    ? "mt-3 mx-auto block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
    : "mt-2 mx-auto block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"

  return (
    <div className="group">
      <input
        type="text"
        value={searchPlate}
        onChange={(e) => setSearchPlate(e.target.value.toUpperCase())}
        placeholder={placeholder}
        className={inputClasses}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className={buttonClasses}
      >
        Search
      </button>
    </div>
  )
}
