export async function GET() {
  const items = [
    {
      id: '1',
      name: "Wireless Noise Cancelling Headphones",
      price: 299.99,
      offPrice: 229.99,
      description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      category: "Audio",
      stock: 45,
      rating: 4.8
    },
    {
      id: '2',
      name: "Smart Watch Pro Series 8",
      price: 399.99,
      offPrice: 349.99,
      description: "Advanced smartwatch with health monitoring, GPS, and LTE connectivity.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      category: "Wearables",
      stock: 28,
      rating: 4.6
    },
    {
      id: '3',
      name: "Gaming Laptop RTX 4080",
      price: 2499.99,
      offPrice: 2199.99,
      description: "High-performance gaming laptop with NVIDIA RTX 4080 and 240Hz display.",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      category: "Computers",
      stock: 12,
      rating: 4.9
    },
    {
      id: '4',
      name: "Bluetooth Speaker Xtreme",
      price: 129.99,
      description: "Waterproof portable speaker with 360° sound and 20-hour battery.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
      category: "Audio",
      stock: 67,
      rating: 4.4
    },
    {
      id: '5',
      name: "4K Ultra HD Smart TV 65\"",
      price: 899.99,
      offPrice: 749.99,
      description: "Smart TV with 4K resolution, HDR, and built-in streaming apps.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
      category: "TV & Home",
      stock: 23,
      rating: 4.7
    },
    {
      id: '6',
      name: "Mirrorless Camera Pro",
      price: 1499.99,
      description: "Professional mirrorless camera with 45MP sensor and 4K video recording.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      category: "Cameras",
      stock: 18,
      rating: 4.8
    },
    {
      id: '7',
      name: "Wireless Gaming Mouse",
      price: 89.99,
      offPrice: 69.99,
      description: "RGB gaming mouse with 16000 DPI and programmable buttons.",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
      category: "Gaming",
      stock: 89,
      rating: 4.5
    },
    {
      id: '8',
      name: "Mechanical Keyboard RGB",
      price: 129.99,
      description: "Mechanical keyboard with RGB lighting and tactile switches.",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80",
      category: "Gaming",
      stock: 56,
      rating: 4.6
    }
  ]
  
  return Response.json({ 
    success: true, 
    data: items,
    count: items.length
  })
}

export async function POST(request) {
  try {
    const newItem = await request.json()
    return Response.json({ 
      success: true, 
      data: { ...newItem, id: Date.now().toString() },
      message: 'Product added successfully'
    }, { status: 201 })
  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Failed to add product' 
    }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await request.json()
    return Response.json({ 
      success: true, 
      message: 'Product updated successfully'
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Failed to update product' 
    }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return Response.json({ 
        success: false, 
        message: 'Product ID required' 
      }, { status: 400 })
    }

    return Response.json({ 
      success: true, 
      message: 'Product deleted successfully'
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Failed to delete product' 
    }, { status: 500 })
  }
}
