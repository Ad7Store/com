import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET)

    return res.status(200).json({ 
      success: true, 
      user: decoded 
    })
    
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    })
  }
}
