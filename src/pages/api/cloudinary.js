export default function handler(req, res) {
  if (req.method === 'POST') {
    // This is a mock implementation
    // In production, use actual Cloudinary API
    
    const { image } = req.body
    
    if (!image) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided' 
      })
    }

    // Generate mock Cloudinary URL
    const mockUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${Date.now()}/sample.jpg`

    return res.status(200).json({ 
      success: true, 
      url: mockUrl,
      message: 'Image uploaded successfully'
    })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
