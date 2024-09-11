'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '../components/header'

const sampleStories = [
  { title: "The Magic Tree", image: "/placeholder.svg?height=200&width=200" },
  { title: "Brave Little Mouse", image: "/placeholder.svg?height=200&width=200" },
  { title: "Space Adventure", image: "/placeholder.svg?height=200&width=200" },
  { title: "Underwater Friends", image: "/placeholder.svg?height=200&width=200" },
  { title: "Dinosaur Discovery", image: "/placeholder.svg?height=200&width=200" },
]

const sampleActivities = [
  { title: "Treasure Hunt", image: "/placeholder.svg?height=200&width=200" },
  { title: "Finger Painting", image: "/placeholder.svg?height=200&width=200" },
  { title: "Balloon Science", image: "/placeholder.svg?height=200&width=200" },
  { title: "Nature Walk", image: "/placeholder.svg?height=200&width=200" },
  { title: "Cookie Baking", image: "/placeholder.svg?height=200&width=200" },
]

export default function Home() {
  const [storyIndex, setStoryIndex] = useState(0)
  const [activityIndex, setActivityIndex] = useState(0)

  useEffect(() => {
    const storyInterval = setInterval(() => {
      setStoryIndex((prevIndex) => (prevIndex + 1) % sampleStories.length)
    }, 3000)

    const activityInterval = setInterval(() => {
      setActivityIndex((prevIndex) => (prevIndex + 1) % sampleActivities.length)
    }, 3000)

    return () => {
      clearInterval(storyInterval)
      clearInterval(activityInterval)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 bg-clay ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-orange-100 rounded-lg shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between ">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Parentivity%20Logo-1TbPWNncxaLKwS7WrlClw0Rh63wUBS.jpg"
              alt="Parentivity Logo"
              width={100}
              height={100}
              className="mr-4"
            />
            <h1 className="text-3xl font-bold text-orange-600">Parentivity</h1>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link href="/about-us" className="text-orange-600 hover:text-orange-800">About Us</Link>
            <Link href="/faq" className="text-orange-600 hover:text-orange-800">FAQ</Link>
            <Link href="/pricing" className="text-orange-600 hover:text-orange-800">Pricing</Link>
            <Link href="/signup" className="btn btn-primary btn-orange">Sign Up</Link>
            <Link href="/login" className="btn btn-primary btn-orange">Log In</Link>
            <Link href="/account" className="btn btn-primary btn-orange">My Account</Link>
          </nav>
        </div>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 bg-gradient-to-b from-orange-100 to-orange-300 bg-clay"
      >
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Sample Stories</h2>
        <div className="relative overflow-hidden h-64">
          <motion.div
            animate={{ x: `-${storyIndex * 100}%` }}
            transition={{ duration: 0.5 }}
            className="flex absolute"
          >
            {sampleStories.map((story, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Image src={story.image} alt={story.title} width={200} height={200} className="mx-auto rounded-lg shadow-md" />
                <p className="mt-2 text-center text-orange-600">{story.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="text-center mt-4">
          <Link href="/create-story" className="btn btn-primary btn-orange">Create Stories</Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12 bg-gradient-to-b from-orange-100 to-orange-300 bg-clay"
      >
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Sample Activities</h2>
        <div className="relative overflow-hidden h-64">
          <motion.div
            animate={{ x: `-${activityIndex * 100}%` }}
            transition={{ duration: 0.5 }}
            className="flex absolute"
          >
            {sampleActivities.map((activity, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <Image src={activity.image} alt={activity.title} width={200} height={200} className="mx-auto rounded-lg shadow-md" />
                <p className="mt-2 text-center text-orange-600">{activity.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="text-center mt-4">
          <Link href="/create-activity" className="btn btn-primary btn-orange">Create Activities</Link>
        </div>
      </motion.section>
    </main>
  )
}