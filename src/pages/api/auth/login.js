import { serialize } from 'cookies'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

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
      res.setHeader('Set-Cookie', serialize('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      }))

      return res.status(200).json({ 
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

    // Check for regular users (simulated)
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

      res.setHeader('Set-Cookie', serialize('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }))

      return res.status(200).json({ 
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

    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    })

  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}
