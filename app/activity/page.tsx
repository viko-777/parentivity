'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '../utils/supabase/client'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

export default function GeneratedActivityPage() {
  const [activityTitle, setActivityTitle] = useState('')
  const [activityContent, setActivityContent] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [ageGroup, setAgeGroup] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/')
      } else {
        setUser(user)
      }
    }
    fetchUser()

    // Get activity data from localStorage
    const activityData = localStorage.getItem('generatedActivity')
    if (activityData) {
      const { title, content, image } = JSON.parse(activityData)
      setActivityTitle(title)
      setActivityContent(content)
      setGeneratedImage(image)
      setLoading(false)
    }
    const ageGroup = localStorage.getItem('ageGroup')
    if (ageGroup) {
      setAgeGroup(ageGroup)
    }
  }, [])


  const saveActivity = async () => {
    if (isSaved) return;

    const { data, error } = await supabase
      .from('Activities')
      .insert([
        {
          title: activityTitle,
          user_id: user.id,
          description: activityContent,
          age_group: ageGroup,
        },
      ])

    if (error) {
      console.error('Error saving activity:', error)
      toast.error('Failed to save the activity. Please try again.')
    } else {
      console.log('Activity saved successfully:', data)
      toast.success('Activity saved successfully!')
      setIsSaved(true)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-orange-50 rounded-lg shadow-md p-6 mt-8 mb-8"
        >
          <Link href="/account?tab=activities" className="inline-block mb-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full transition duration-300 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600">
              ← Back to Activities
            </button>
          </Link>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Generated Activity</h2>
          <label className="text-1xl font-bold text-orange-600 mb-2">Title</label>
          <input
            type="text"
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
            placeholder="Activity Title" disabled
          />
          <textarea
            value={activityContent}
            onChange={(e) => setActivityContent(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
            rows={20}
            placeholder="Activity Content" disabled
          />
          {generatedImage && (
            <img src={generatedImage} alt="Activity Image" className="w-full rounded-lg shadow-md mb-4" />
          )}
          <div className="flex justify-center mt-6">
            {!isSaved && (
              <button
                onClick={saveActivity}
                className="bg-orange-500 text-white px-12 py-3 rounded-full transition duration-300 text-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600"
              >
                Save Activity
              </button>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
      {loading && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}