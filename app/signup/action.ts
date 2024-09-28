'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = createClient()

    console.log(formData)
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    console.log(data)

    const { data: authData, error } = await supabase.auth.signUp(data)

    if (error) {
      console.log(error)
      redirect('/')
      return { success: false, message: 'An error occurred during sign up.' }
    }

    revalidatePath('/', 'layout')
    redirect('/')
    return { success: true, message: 'Signup successful. Please check your email for verification.' }
  }
    // Set user data in cookies
    cookies().set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
  