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

    const cleanedTitle = storyTitle.replace(/^\*\*(.*)\*\*$/, '$1');

    try {
      console.log('Fetching and compressing image...');
      const compressedFile = await fetchAndCompressImage(generatedImage);
      console.log('Image fetched and compressed successfully');

      // Upload compressed image to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('story_images')
        .upload(`${user.id}/${Date.now()}_${cleanedTitle}.jpg`, compressedFile, {
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        toast.error('Error uploading image: ${uploadError.message}');
        throw new Error(`Error uploading image: ${uploadError.message}`);
      }

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('story_images')
        .getPublicUrl(uploadData.path);

      const { data, error } = await supabase
        .from('Stories')
        .insert([
          {
            title: cleanedTitle,
            user_id: user.id,
            description: storyContent,
            age_group: JSON.parse(ageGroup).ageGroup,
            image_url: publicUrl,
          },
        ])
        .select();
      
      if (data) {
        toast.success('Story saved successfully!');
        setIsSaved(true);
      }

      if (error) {
        console.error('Error saving story:', error);
        toast.error('Failed to save the story. Please try again.');
        setIsSaved(false);
      }

    } catch (error) {
      console.error('Error in saveStory:', error);
      toast.error('Failed to save the story or image. Please try again.');
      setIsSaved(false);
    }
  };

  // New function to fetch and compress the image
  const fetchAndCompressImage = async (imageUrl: string): Promise<Blob> => {
    try {
      console.log('Fetching image from:', imageUrl);
      const response = await axios.post('/api/fetch-image', { imageUrl }, {
        responseType: 'blob'
      });

      console.log('Image fetched successfully');
      const blob = response.data;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      console.log('Compressing image...');
      const compressedFile = await imageCompression(blob as File, options);
      console.log('Image compressed successfully');
      return compressedFile;
    } catch (error) {
      console.error('Error in fetchAndCompressImage:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('API response:', error.response.data);
        toast.error(`Failed to fetch image: ${error.response.data.error}`);
      } else {
        toast.error('An unexpected error occurred while fetching the image');
      }
      throw error;
    }
  };

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
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Generated Story</h2>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">{storyTitle.replace(/^\*\*(.*)\*\*$/, '$1')}</h1>
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
          </div>
          {generatedImage && (
            <img src={generatedImage} alt="Story Image" className="w-full rounded-lg shadow-md mb-4 mt-6" />
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