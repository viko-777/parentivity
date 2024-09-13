import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <Header />
        <div className="flex flex-col md:flex-row items-center justify-between">
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
            <Link href="/signup" className="btn btn-primary">Sign Up</Link>
            <Link href="/login" className="btn btn-primary">Log In</Link>
            <Link href="/account" className="btn btn-primary">My Account</Link>
          </nav>
        </div>
      </motion.div>
    )
}
