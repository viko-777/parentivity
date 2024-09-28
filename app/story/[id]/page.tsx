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
        if (data.image_url) {
          setGeneratedImage(data.image_url)
        }
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
      <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-orange-100 to-orange-50 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8 mb-8"
        >
          <Link href="/account?tab=stories" className="inline-block mb-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full transition duration-300 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-orange-600">
              ← Back to Stories
            </button>
          </Link>
          
          {/* Book page rendering */}
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-orange-800  mb-6 text-center underline">{storyTitle}</h1>
              <div className="text-gray-800  whitespace-pre-wrap story-content" style={{fontSize: '1.3rem', lineHeight: '1.6' }}>
                {storyContent && (
                  <>
                    <span className="float-left text-9xl mr-3 mt-1 leading-none font-serif font-bold">
                      {storyContent.charAt(0)}
                    </span>
                    <br />
                    {storyContent.slice(1)}
                  </>
                )}
              </div>
            </div>

          {generatedImage && (
            <img 
              src={generatedImage} 
              alt="Story Image" 
              className="w-full rounded-lg shadow-md mb-4" 
              onError={(e) => {
                console.error('Image failed to load:', e);
                setGeneratedImage('');
              }}
            />
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