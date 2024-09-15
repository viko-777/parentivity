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
      redirect('/error')
    }

    if (authData && authData.user) {
      const { error: userError } = await supabase.from('UserProfile').insert({
          user_id: authData.user.id
      })

      if (userError) {
        console.log(userError)
        redirect('/error')
      }
    }

    revalidatePath('/', 'layout')
    redirect('/')
  }