import { RealtimeStatus } from "@/components/admin/realtime-status"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold">SHINEST Admin</h1>
          <p className="text-sm text-gray-400">Yönetim Paneli</p>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <a href="#" className="block">Dashboard</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="#" className="block">Ürünler</a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <a href="#" className="block">Siparişler</a>
            </li>
            {/* Add more menu items here */}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SHINEST Admin</h1>
              <p className="text-sm text-gray-600">İçerik Yönetim Sistemi</p>
            </div>
            
            {/* Realtime Status */}
            <div className="flex items-center gap-4">
              <RealtimeStatus />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#c4975a] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
