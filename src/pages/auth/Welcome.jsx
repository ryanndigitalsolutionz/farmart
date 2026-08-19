import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Wheat, Settings } from 'lucide-react'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import { ROLES, USER_ROLES } from '../../constants/userRoles'

const Welcome = () => {
  const navigate = useNavigate()

  const roles = [
    {
      role: ROLES.BUYER,
      label: USER_ROLES[ROLES.BUYER],
      description: 'Purchase quality livestock from trusted farmers',
      icon: ShoppingCart,
    },
    {
      role: ROLES.FARMER,
      label: USER_ROLES[ROLES.FARMER],
      description: 'List and sell your livestock to buyers',
      icon: Wheat,
    },
    {
      role: ROLES.ADMIN,
      label: USER_ROLES[ROLES.ADMIN],
      description: 'Manage platform operations and users',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">Farmart</div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-4xl w-full">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Kenya&apos;s Trusted Livestock Marketplace
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Connect with verified farmers and buyers. Trade livestock safely with
            secure payments and verified profiles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {roles.map(({ role, label, description, icon: Icon }) => (
              <div
                key={role}
                className="card cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate('/register', { state: { role } })}
              >
                <div className="card-body text-center p-6">
                  <Icon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {label}
                  </h3>
                  <p className="text-sm text-gray-600">{description}</p>
                  <Badge variant="green" className="mt-3">
                    {label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <Button size="lg" onClick={() => navigate('/register')}>
            Create Free Account
          </Button>
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; 2026 Farmart. All rights reserved.
      </footer>
    </div>
  )
}

export default Welcome
