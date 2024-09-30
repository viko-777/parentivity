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
import imageCompression from 'browser-image-compression';
import axios from 'axios';

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

  useEffect(() => {
    const fetchUserAndStory = async () => {
      setLoading(true);
      // Fetch user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.push('/')
        return;
      }
      setUser(user)

      // Fetch story
      const { data, error } = await supabase
        .from('Stories')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) {
        console.error('Error fetching story:', error)
        setLoading(false)
        return;
      }

      setStoryTitle(data.title)
      setStoryContent(data.description)
      setAgeGroup(data.age_group)
      setIsSaved(true)

      // Fetch image
      if (user && data.title) {
        const { data: imageData, error: imageError } = await supabase
          .storage
          .from('story_images')
          .download(`${user.id}/${data.title}.jpg`)
        
        if (imageData && !imageError) {
          const imageUrl = URL.createObjectURL(imageData)
          setGeneratedImage(imageUrl)
        }
      }

      setLoading(false)
    }

    fetchUserAndStory()
  }, [params.id])

  return (
    <>
      <Header />
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto rounded-lg shadow-md p-6 mt-8 mb-8"
        >
          <Link href="/account?tab=stories" className="inline-block mb-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full transition duration-300 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600">
              ← Back to Stories
            </button>
          </Link>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">{storyTitle}</h1>
            <div className="text-orange-800 whitespace-pre-wrap story-content" style={{ columnCount: 1, columnGap: '2rem', fontSize: '1.3rem', lineHeight: '1.6' }}>
              {storyContent && (
                <>
                  <span className="float-left text-7xl font-bold mr-3 mt-1 leading-none">
                    {storyContent.charAt(0)}
                  </span>
                  {storyContent.slice(1)}
                </>
              )}
            </div>
            {generatedImage && (
              <img src={generatedImage} alt="Story Image" className="w-full rounded-lg shadow-md mt-8" />
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