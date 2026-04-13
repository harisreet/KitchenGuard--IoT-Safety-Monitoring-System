import { Outlet, Link, useLocation } from 'react-router';
import { Activity, BarChart3, Settings } from 'lucide-react';

export function Root() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Smart Kitchen Monitor</h1>
                <p className="text-xs text-gray-500">Real-time monitoring system</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link
                to="/analytics"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  isActive('/analytics')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
              <Link
                to="/settings"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  isActive('/settings')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
