export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = [
      {
        id: 1,
        name: "Admin User",
        email: "zaid@gmail.com",
        role: "admin",
        status: "active",
        joined: "2024-01-01",
        lastActive: "2024-01-15",
        orders: 156,
        totalSpent: "$12,458"
      },
      {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        joined: "2024-01-10",
        lastActive: "2024-01-14",
        orders: 24,
        totalSpent: "$2,450"
      },
      {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "blocked",
        joined: "2024-01-05",
        lastActive: "2024-01-10",
        orders: 8,
        totalSpent: "$850"
      }
    ]
    
    return res.status(200).json({ 
      success: true, 
      data: users,
      count: users.length
    })
  }

  if (req.method === 'PUT') {
    // Update user
    return res.status(200).json({ 
      success: true, 
      message: 'User updated successfully'
    })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
