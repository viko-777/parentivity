'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function editProfile(userProfile: any, userId: string) {
  const supabase = createClient()

  // First, check if the user profile exists
  const { data: existingProfile, error: fetchError } = await supabase
    .from('UserProfile')
    .select()
    .eq('user_id', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error(fetchError)
    return { success: false, error: fetchError.message }
  }

  let result;

  if (existingProfile) {
    // Update existing profile
    result = await supabase
      .from('UserProfile')
      .update({
        name: userProfile.name,
        city: userProfile.city,
        country: userProfile.country,
        language: userProfile.language,
      })
      .eq('user_id', userId)
      .select()
  } else {
    // Insert new profile
    result = await supabase
      .from('UserProfile')
      .insert({
        user_id: userId,
        name: userProfile.name,
        city: userProfile.city,
        country: userProfile.country,
        language: userProfile.language,
      })
      .select()
  }

  const { data, error } = result

  if (error) {
    console.error(error)
    return { success: false, error: error.message }
  }

  revalidatePath('/account')
  return { success: true, data: data[0] }
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