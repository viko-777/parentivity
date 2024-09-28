'use server'

import { cookies } from 'next/headers'

export async function checkAuthStatus(): Promise<boolean> {
  const userCookie = cookies().get('user')
  return !!userCookie?.value
}