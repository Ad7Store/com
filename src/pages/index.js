import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Layout/Navbar'
import HeroSection from '@/components/Home/HeroSection'
import ProductCard from '@/components/Home/ProductCard'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/items')
      if (response.data.success) {
        setProducts(response.data.data)
      } else {
        toast.error('Failed to load products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
      // Fallback to sample data
      setProducts(getSampleProducts())
    } finally {
      setLoading(false)
    }
  }

  const getSampleProducts = () => {
    return [
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
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Electronics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the latest gadgets and electronics with exclusive deals
          </p>
        </motion.div>

        {searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <p className="text-gray-700">
              Showing results for "<span className="font-semibold">{searchTerm}</span>"
              <span className="ml-2 text-gray-500">
                ({filteredProducts.length} products found)
              </span>
            </p>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="btn-primary"
            >
              View All Products
            </button>
          </motion.div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ElectroShop</h3>
              <p className="text-gray-400">Your one-stop destination for premium electronics.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Products</a></li>
                <li><a href="#" className="hover:text-white transition">Deals</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe for exclusive deals</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ElectroShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
