'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-orange-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-orange-500 rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-orange-100 text-orange-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="bg-orange-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/Parentivity Logo.jpg" alt="Parentivity Logo" width={50} height={50} className="mr-2" />
            <h1 className="text-2xl font-bold">Parentivity</h1>
          </div>
          <nav>
            <motion.ul className="flex space-x-4" variants={itemVariants}>
              <li><Link href="/about" className="px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-center">About Us</Link></li>
              <li><Link href="/faq" className="px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-center">FAQ</Link></li>
              <li><Link href="/pricing" className="px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-center">Pricing</Link></li>
              <li><Link href="/signup" className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded">Sign Up</Link></li>
              <li><Link href="/login" className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded">Log In</Link></li>
              <li><Link href="/account" className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded">My Account</Link></li>
            </motion.ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4">Sample Stories</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4">
                <Image src={`/story-${i}.jpg`} alt={`Story ${i}`} width={200} height={150} className="mb-2 rounded" />
                <h3 className="font-semibold">Story Title {i}</h3>
              </div>
            ))}
          </div>
          <Link href="/create-story" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            Create Stories
          </Link>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4">Sample Activities</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4">
                <Image src={`/activity-${i}.jpg`} alt={`Activity ${i}`} width={200} height={150} className="mb-2 rounded" />
                <h3 className="font-semibold">Activity Title {i}</h3>
              </div>
            ))}
          </div>
          <Link href="/create-activity" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
            Create Activities
          </Link>
        </motion.section>
      </main>
    </motion.div>
  )
}