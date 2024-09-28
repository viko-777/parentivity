'use client'

import Image from 'next/image'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'
import Footer from '@/components/footer'
import { createClient } from './utils/supabase/client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

const sampleStories = [
  { title: "The Magic Tree", image: "/themagictree.webp" },
  { title: "Brave Little Mouse", image: "/Brave Little Mouse.webp" },
  { title: "Space Adventure", image: "/Space Adventure.webp" },
  { title: "Underwater Friends", image: "/Underwater Friends.webp" },
  { title: "Dinosaur Discovery", image: "/Dinosaur Discovery.webp" },
]

const sampleActivities = [
  { title: "Treasure Hunt", image: "/Treasure hunt.webp" },
  { title: "Finger Painting", image: "/Finger Painting.webp" },
  { title: "Balloon Science", image: "/Balloon science.webp" },
  { title: "Nature Walk", image: "/Nature Walk.webp" },
  { title: "Cookie Baking", image: "/Cookie Baking.webp" },
]

const ParentivityLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [storyIndex, setStoryIndex] = useState(0)
  const [activityIndex, setActivityIndex] = useState(0)
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient()
  
  const backgroundIcons = [
    { Icon: Star, className: "text-yellow-400" },
    { Icon: Moon, className: "text-blue-300" },
    { Icon: Cloud, className: "text-gray-300" },
    { Icon: Smile, className: "text-yellow-500" },
    { Icon: Footprints, className: "text-pink-300" },
    { Icon: Hand, className: "text-orange-300" },
    { Icon: Users, className: "text-purple-400" },
    { Icon: Flower, className: "text-pink-400" },
    { Icon: Sun, className: "text-yellow-500" },
    { Icon: Bike, className: "text-green-400" },
  ]

  const additionalEmojis = [
    { emoji: "🚀" },
    { emoji: "🌈" },
    { emoji: "🎨" },
    { emoji: "🎭" },
    { emoji: "🧩" },
    { emoji: "🏆" },
    { emoji: "🎸" },
    { emoji: "🧸" },
    { emoji: "🌺" },
    { emoji: "🦄" },
  ]

  const featureEmojis = ["🎉", "🧘‍♀️", "👶", "🎓", "❤️"]
  const allEmojis = [...additionalEmojis.map(e => e.emoji), ...featureEmojis]
  const [currentIndex, setCurrentIndex] = useState(0);

  const BackgroundEmojis = ({ count = 20 }) => (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={`bg-emoji-${i}`}
          className="absolute text-4xl opacity-10 animate-float pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        >
          {allEmojis[Math.floor(Math.random() * allEmojis.length)]}
        </div>
      ))}
    </>
  )

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

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
  }, [router, supabase]);

  const cards = [
    { text: "Struggling finding ways to have quality time with your child?" },
    { text: "Unsure how to engage your child?" },
    { text: "Feeling overwhelmed by parenting?" },
    { text: "Wish you had personalized, actionable guidance at your fingertips?" },
    { text: "Welcome to Parentivity!" },
    { text: "Join Us Today!" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-['Comic_Sans_MS',_'Comic_Sans',_cursive] bg-gradient-to-b from-white to-orange-100 overflow-hidden relative">
      {/* Background blobs and icons */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      {[...Array(40)].map((_, i) => {
        const IconComponent = backgroundIcons[i % backgroundIcons.length].Icon
        const iconClass = backgroundIcons[i % backgroundIcons.length].className
        return (
          <IconComponent
            key={i}
            className={`absolute ${iconClass} animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        )
      })}

      {/* Updated Header */}
      <header className="bg-transparent absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 relative">
              <Link href="/">
                <Image 
                  src="/Parentivity.svg" 
                  alt="Parentivity" 
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <a href="about-us" className="text-orange-600 hover:text-orange-700 font-bold transition duration-300">About Us</a>
              <a href="faq" className="text-orange-600 hover:text-orange-700 font-bold transition duration-300">FAQ</a>
              <a href="pricing" className="text-orange-600 hover:text-orange-700 font-bold transition duration-300">Pricing</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative">
        <BackgroundEmojis count={30} />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-orange-600">
          Spark Creative Moments with Your Child!
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-orange-600">
          An AI powered parenting assistant to craft engaging activities that spark your child's imagination
        </p>
        <div className="w-full max-w-3xl mx-auto mb-10 relative">
          <Image 
            src="/parent-and-child-activity-image.png" 
            alt="Parents and child doing a creative activity together" 
            width={800}
            height={600}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <p className="text-2xl font-bold text-orange-600 mb-8">
          Wish you had personalized, actionable guidance at your fingertips?
        </p>
        <Link href="/login">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105">
            Try the Magic
          </button>
        </Link>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-4 bg-white bg-opacity-80 backdrop-blur-md">
        <BackgroundEmojis count={30} />
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">How it Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-64 h-128 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-3xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl h-full p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Empower Parents with Tailored Guidance</h3>
                <p className="text-gray-700 mb-4">Equip parents with personalized, actionable advice designed to meet their child's unique developmental stage, interests, and emotional needs.</p>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
            </div>
            
            <div className="w-64 h-128 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-3xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl h-full p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Enhance Parent-Child Interaction</h3>
                <p className="text-gray-700 mb-4">Spark meaningful, engaging interactions through customized stories, activities, and learning pathways that deepen the parent-child bond.</p>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
              </div>
            </div>

            <div className="w-64 h-128 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-3xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl h-full p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Promote Family Bonding</h3>
                <p className="text-gray-700 mb-4">Strengthen family connections with thoughtfully curated bonding experiences that create lasting memories and reinforce togetherness.</p>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-6xl">🎭</span>
                </div>
              </div>
            </div>

            <div className="w-64 h-128 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-3xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition duration-300">
              <div className="bg-white rounded-2xl h-full p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-4 text-orange-600">Support Emotional and Cognitive Growth</h3>
                <p className="text-gray-700 mb-4">Unlock your child's full potential with growth-driven activities, and expert guidance to nurture emotional intelligence and cognitive development.</p>
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-6xl">🌈</span>
                </div>
              </div>
            </div>
          </div>
         </div>
         <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <Link href="/login">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
                Try the Magic
              </button>
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white bg-opacity-80 backdrop-blur-md">
      <BackgroundEmojis count={30} />
      <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">Create Joyful Adventures with Your Child</h2>
          <div className="space-y-16">
            {[
              {
                title: "Instant Fun at Your Fingertips",
                description: "No more Googling 'How to entertain my kid'! The app serves up quick, easy ideas to keep your little one engaged.",
                image: "/instantfun.png",
                alt: "Father and son using the Parentivity app for instant fun ideas",
              },
              {
                title: "Tailored to Your MiniMe",
                description: "Whether your kiddo is into dinosaurs, princesses, or space adventures, the app delivers personalized content just for them.",
                image: "/tailoredtourminime.png",
                alt: "Illustrations of a child as a princess, with a dinosaur, and as an astronaut",
              },
              {
                title: "Learning Disguised as Fun",
                description: "Sneak in a bit of education without your kid noticing! They'll be learning and growing while they think they're just having a blast.",
                image: "/learningasdisguised.png",
                alt: "Mother and children engaged in creative learning activities",
              },
              {
                title: "ScreenFree and StressFree",
                description: "This app lets you say, 'No screens!' without the tantrums. It's all about hands-on fun that keeps kids happy and learning.",
                image: "/screenfreestressfree copy.png",
                alt: "Family engaged in various creative activities in a cozy living room",
              },
              {
                title: "Quality Time Made Easy",
                description: "Let's face it, bonding with your kid can feel like a chore when you're busy. This app turns 'ugh, playtime' into 'yay, playtime!'",
                image: "/qualitytimemadeeasy copy.png",
                alt: "Collage of various parent-child activities and adventures",
              },
            ].map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                <div className="w-full md:w-1/2">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-bold text-orange-600">{feature.title}</h3>
                  <p className="text-gray-700" style={{ fontSize: '1.25rem' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {
      /* Artist in the Making Section
      <section className="py-20 px-4 bg-white bg-opacity-80 backdrop-blur-md relative overflow-hidden">
        <BackgroundEmojis count={30} />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-600">Artist in the Making</h2>
          <p className="text-xl mb-8 text-gray-700">Watch your child's creativity bloom with our fun art activities!</p>
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className="text-6xl">🎨</span>
            <span className="text-6xl">✏️</span>
            <span className="text-6xl">🖍️</span>
          </div>
          <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xl px-8 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 transition duration-300 transform hover:scale-105">
            Spot the Artist
          </button>
        </div>
      </section> */}
    
    <section className="py-20 px-4 bg-white bg-opacity-80 backdrop-blur-md">
    <BackgroundEmojis count={30} />

      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">Sample Stories</h2>
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
        <Link href={isLoggedIn ? "/create-story" : "/login"}> 
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
            Create Stories
          </button>
        </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">Sample Activities</h2>
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
        <Link href={isLoggedIn ? "/create-activity" : "/login"}>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
              Create Activities
          </button>
        </Link>
        </div>
      </motion.section>
    </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-yellow-100 relative overflow-hidden">
        <BackgroundEmojis count={30} />
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-600">Happy Parents Feedback</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Manasi", quote: "This app has been a lifesaver! My kids are always excited to try the new activities.", emoji: "😊" },
              { name: "Vikas", quote: "I've never felt more connected to my children. The quality time we spend together is priceless.", emoji: "❤️" },
              { name: "Rohan", quote: "As a busy parent, this app helps me come up with creative ideas when my brain is fried. Love it!", emoji: "🌟" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 w-64 h-64 flex flex-col justify-between">
                <div className="text-4xl mb-4">{testimonial.emoji}</div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <p className="font-bold text-orange-600">- {testimonial.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
          <Link href="/login">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105">
                Try the Magic
              </button>
          </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
export default ParentivityLanding