'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function editProfile(profileData: any, userId: string) {
  const supabase = createClient()

  // First, check if a profile exists for this user
  const { data: existingProfile, error: fetchError } = await supabase
    .from('UserProfile')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    return { success: false, error: 'Error fetching profile' }
  }

  let result

  if (existingProfile) {
    // If profile exists, update it
    const { data, error } = await supabase
      .from('UserProfile')
      .update(profileData)
      .eq('user_id', userId)
      .select() // Add this to return the updated data

    result = { data, error }
  } else {
    // If profile doesn't exist, insert a new one
    const { data, error } = await supabase
      .from('UserProfile')
      .insert({ ...profileData, user_id: userId })
      .select() // Add this to return the inserted data

    result = { data, error }
  }

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  return { success: true, data: result.data }
}

export async function createKidProfile(newKidData: any, userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('KidsProfiles')
    .insert({ ...newKidData, user_id: userId })
    .select()

  if (error) {
    console.error(error)
    return { success: false, error: error.message }
  }

  revalidatePath('/account')
  return { success: true, data: data[0] }
}

export async function updateKidProfile(updatedKidData: any) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('KidsProfiles')
    .update(updatedKidData)
    .eq('id', updatedKidData.id)
    .select()

  if (error) {
    console.error(error)
    return { success: false, error: error.message }
  }

  revalidatePath('/account')
  return { success: true, data: data[0] }
}