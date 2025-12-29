import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import AdminLayout from '@/components/Admin/AdminLayout'
import ItemsManagement from '@/components/Admin/ItemsManagement'
import UsersManagement from '@/components/Admin/UsersManagement'
import CheckoutsManagement from '@/components/Admin/CheckoutsManagement'

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()
  const { tab = 'dashboard' } = router.query

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login')
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const renderContent = () => {
    switch (tab) {
      case 'items':
        return <ItemsManagement />
      case 'users':
        return <UsersManagement />
      case 'checkouts':
        return <CheckoutsManagement />
      default:
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Welcome to Admin Panel
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Manage your e-commerce store, products, orders, and users from one place
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Total Products',
                  value: '24',
                  icon: '📦',
                  color: 'from-blue-500 to-blue-600',
                  link: '/admin?tab=items'
                },
                {
                  title: 'Total Orders',
                  value: '156',
                  icon: '🛒',
                  color: 'from-green-500 to-green-600',
                  link: '/admin?tab=checkouts'
                },
                {
                  title: 'Active Users',
                  value: '89',
                  icon: '👥',
                  color: 'from-purple-500 to-purple-600',
                  link: '/admin?tab=users'
                },
                {
                  title: 'Revenue',
                  value: '$12,458',
                  icon: '💰',
                  color: 'from-yellow-500 to-yellow-600',
                  link: '#'
                }
              ].map((stat, index) => (
                <motion.a
                  key={stat.title}
                  href={stat.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block"
                >
                  <div className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-90">{stat.title}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <span className="text-3xl">{stat.icon}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 mt-6"
            >
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push('/admin?tab=items')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">➕</div>
                  <p className="font-semibold">Add New Product</p>
                </button>
                
                <button
                  onClick={() => router.push('/admin?tab=checkouts')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                  <p className="font-semibold">View Orders</p>
                </button>
                
                <button
                  onClick={() => router.push('/admin?tab=users')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👤</div>
                  <p className="font-semibold">Manage Users</p>
                </button>
              </div>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <AdminLayout activeTab={tab}>
      {renderContent()}
    </AdminLayout>
  )
}
