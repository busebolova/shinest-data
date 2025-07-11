import { RealtimeDashboard } from "@/components/admin/realtime-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">SHINEST Admin Panel</p>
          </div>
        </div>

        {/* Realtime Dashboard */}
        <RealtimeDashboard />
      </div>
    </div>
  )
}
