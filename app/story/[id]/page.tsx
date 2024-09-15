'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '../../utils/supabase/client'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

export default function GeneratedStoryPage() {
  const [storyTitle, setStoryTitle] = useState('')
  const [storyContent, setStoryContent] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [user, setUser] = useState<any>(null)
  const [ageGroup, setAgeGroup] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [story, setStory] = useState<any>(null)

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

    // Get story data from localStorage
    const storyData = localStorage.getItem('generatedStory')
    if (storyData) {
      const { title, content, image } = JSON.parse(storyData)
      setStoryTitle(title)
      setStoryContent(content)
      setGeneratedImage(image)
    }
    const ageGroup = localStorage.getItem('ageGroup')
    if (ageGroup) {
      setAgeGroup(ageGroup)
    }
  }, [])

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('Stories')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching story:', error)
      } else {
        setStoryTitle(data.title)
        setStoryContent(data.description)
        setAgeGroup(data.age_group)
        setIsSaved(true)
      }
      setLoading(false)
    }

    fetchStory()
  }, [params.id])

  const saveStory = async () => {
    if (isSaved) return;

    const { data, error } = await supabase
      .from('Stories')
      .insert([
        {
          title: storyTitle,
          user_id: user.id,
          description: storyContent,
          age_group: ageGroup,
        },
      ])

    if (error) {
      console.error('Error saving story:', error)
      toast.error('Failed to save the story. Please try again.')
    } else {
      console.log('Story saved successfully:', data)
      toast.success('Story saved successfully!')
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
          <Link href="/account?tab=stories" className="inline-block mb-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full transition duration-300 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600">
              ← Back to Stories
            </button>
          </Link>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Generated Story</h2>
          <label className="text-1xl font-bold text-orange-600 mb-2">Title</label>
          <input
            type="text"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
            placeholder="Story Title" disabled
          />
          <textarea
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
            rows={20}
            placeholder="Story Content" disabled
          />
          {generatedImage && (
            <img src={generatedImage} alt="Story Image" className="w-full rounded-lg shadow-md mb-4" />
          )}
          <div className="flex justify-center mt-6">
            {!isSaved && (
              <button
                onClick={saveStory}
                className="bg-orange-500 text-white px-12 py-3 rounded-full transition duration-300 text-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600"
              >
                Save Story
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