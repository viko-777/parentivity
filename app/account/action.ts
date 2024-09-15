'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function editProfile(userProfile: any, userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('UserProfile')
    .upsert({
      user_id: userId,
      name: userProfile.name,
      city: userProfile.city,
      country: userProfile.country,
      language: userProfile.language,
    }, { onConflict: 'user_id' })
    .select()

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