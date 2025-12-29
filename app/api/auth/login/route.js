import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Check for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { 
          email, 
          name: 'Admin User',
          role: 'admin',
          id: '1' 
        },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: '7d' }
      )

      // Set cookie
      const cookieStore = cookies()
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return Response.json({ 
        success: true, 
        user: { 
          email, 
          name: 'Admin User',
          role: 'admin',
          id: '1'
        },
        redirect: '/admin',
        token
      })
    }

    // Check for regular users
    if (email && password) {
      const token = jwt.sign(
        { 
          email, 
          name: email.split('@')[0],
          role: 'user',
          id: Date.now().toString()
        },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: '7d' }
      )

      const cookieStore = cookies()
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return Response.json({ 
        success: true, 
        user: { 
          email, 
          name: email.split('@')[0],
          role: 'user',
          id: Date.now().toString()
        },
        redirect: '/',
        token
      })
    }

    return Response.json({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { status: 401 })

  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
