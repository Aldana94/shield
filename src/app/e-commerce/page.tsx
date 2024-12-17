import MainLayout from '@/components/layout/MainLayout';

export default function ECommerce() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">E-Commerce Scripts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example script card */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Update Inventory</h3>
              <p className="text-sm text-gray-600 mb-4">
                Synchronize inventory levels across all platforms
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Execute
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}