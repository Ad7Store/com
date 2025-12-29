export default function handler(req, res) {
  if (req.method === 'GET') {
    const orders = [
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 (234) 567-8900",
          whatsapp: "+1 (234) 567-8900",
          address: "123 Main Street, Apt 4B, New York, NY 10001"
        },
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 229.99 }
        ],
        total: 229.99,
        status: "pending",
        date: "2024-01-15",
        payment: "Credit Card",
        shipping: "Standard"
      },
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        customer: {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 (345) 678-9012",
          whatsapp: "+1 (345) 678-9012",
          address: "456 Oak Avenue, Los Angeles, CA 90001"
        },
        items: [
          { name: "Smart Watch Pro", quantity: 1, price: 349.99 },
          { name: "Bluetooth Speaker", quantity: 2, price: 129.99 }
        ],
        total: 609.97,
        status: "completed",
        date: "2024-01-14",
        payment: "PayPal",
        shipping: "Express"
      }
    ]
    
    return res.status(200).json({ 
      success: true, 
      data: orders,
      count: orders.length
    })
  }

  if (req.method === 'POST') {
    // Create new order
    const order = req.body
    return res.status(201).json({ 
      success: true, 
      data: { ...order, id: Date.now(), orderNumber: `ORD-${Date.now()}` },
      message: 'Order placed successfully'
    })
  }

  if (req.method === 'PUT') {
    // Update order status
    return res.status(200).json({ 
      success: true, 
      message: 'Order updated successfully'
    })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
