import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      setIsLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { isLoggedIn, isLoading, setIsLoggedIn }
}