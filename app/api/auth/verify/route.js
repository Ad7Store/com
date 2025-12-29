import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET(request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return Response.json({ 
        success: false, 
        message: 'No token provided' 
      }, { status: 401 })
    }

    const decoded = jwt.verify(token.value, process.env.NEXTAUTH_SECRET)

    return Response.json({ 
      success: true, 
      user: decoded 
    })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Invalid token' 
    }, { status: 401 })
  }
}
