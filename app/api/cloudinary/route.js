export async function POST(request) {
  try {
    const { image } = await request.json()
    
    if (!image) {
      return Response.json({ 
        success: false, 
        message: 'No image provided' 
      }, { status: 400 })
    }

    // In production, use actual Cloudinary API
    // For now, return a mock URL
    const mockUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${Date.now()}/sample.jpg`

    return Response.json({ 
      success: true, 
      url: mockUrl,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Failed to upload image' 
    }, { status: 500 })
  }
}
