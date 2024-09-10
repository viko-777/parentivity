'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StoryCreationPage() {
  const [request, setRequest] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [kidsProfile, setKidsProfile] = useState('')
  const [generatedStory, setGeneratedStory] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to generate the story and image
    setGeneratedStory('Once upon a time...')
    setGeneratedImage('/generated-story-image.jpg')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Create a Story</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="request" className="block text-orange-700 mb-2">Story Request</label>
            <textarea
              id="request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ageGroup" className="block text-orange-700 mb-2">Age Group</label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Age Group</option>
              <option value="3-4">3-4 years</option>
              <option value="5-6">5-6 years</option>
              <option value="7-8">7-8 years</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="kidsProfile" className="block text-orange-700 mb-2">Kid's Profile</label>
            <select
              id="kidsProfile"
              value={kidsProfile}
              onChange={(e) => setKidsProfile(e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Kid's Profile</option>
              <option value="profile1">Profile 1</option>
              <option value="profile2">Profile 2</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300"
            type="submit"
          >
            Generate Story
          </motion.button>
        </form>
        {generatedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Generated Story</h2>
            <p className="mb-4">{generatedStory}</p>
            {generatedImage && (
              <img src={generatedImage} alt="Generated Story Image" className="w-full rounded-lg shadow-md" />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}