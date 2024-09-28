'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { signup } from './action'
import Header from '@/components/header'
import { Menu, X, Star, Moon, Cloud, Smile, Footprints, Hand, Users, Flower, Sun, Bike } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { checkAuthStatus } from '@/lib/userUtils'

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

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus()
      if (isAuthenticated) {
        router.push('/account')
      }
    }
    checkAuth()
  }, [router])
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    
    // Check if passwords match when either password field changes
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordsMatch(formData.password === e.target.value)
    }
  }

  const handleSignup = async (formData: FormData) => {
    // Check if passwords match before submitting
    if (formData.get('password') !== formData.get('confirmPassword')) {
      toast.error('Passwords do not match.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const result = await signup(formData)
      if (result.success) {
        toast.success('Sign up successful! We\'ve sent you a verification email. Please verify your email and log in again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push('/')
        }, 5000)
      } else {
        toast.error(result.message || 'An error occurred during sign up.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <>
      <Header />
      <ToastContainer position="top-right" />
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-orange-100 flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Sign Up</h1>
        <form action={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-orange-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-orange-500 bg-orange-100 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-orange-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-orange-500 bg-orange-100 rounded-md p-2"
              required
              minLength={8}
            />
            <p className="text-sm text-orange-600 mt-1">Password must be at least 8 characters long</p>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-orange-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full text-orange-500 bg-orange-100 rounded-md p-2 ${!passwordsMatch ? 'border-red-500' : ''}`}
              required
              minLength={8}
            />
            {!passwordsMatch && <p className="text-sm text-red-500 mt-1">Passwords do not match</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
            type="submit"
            disabled={!passwordsMatch}
          >
            Create an Account
          </motion.button>
        </form>
        <p className="mt-4 text-center text-orange-700">
          Already have an account? <Link href="/login" className="text-orange-500 hover:underline">Log in</Link>
        </p>
      </div>
    </motion.div>
    </div>
    </>
  )
}