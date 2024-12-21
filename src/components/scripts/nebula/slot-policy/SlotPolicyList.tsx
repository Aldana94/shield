'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import { environments } from '@/config/environments';
import { fetchSlotPolicies } from '@/services/api';
import { 
  getStoresByClient, 
  getClients,
  type Store,
  type Client 
} from '@/services/stores';
import { JsonPreviewModal } from '@/components/ui/JsonPreviewModal';

export function SlotPolicyList() {
  const { currentEnvironment } = useEnvironment();
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [policies, setPolicies] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const clientList = await getClients(currentEnvironment);
        setClients(clientList);
      } catch (err) {
        setError('Failed to load clients');
        console.error('Load clients error:', err);
      }
    }
    loadClients();
  }, [currentEnvironment]);

  useEffect(() => {
    if (selectedClient) {
      loadStores();
    }
  }, [selectedClient]);

  const loadStores = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const storeList = await getStoresByClient(currentEnvironment, selectedClient);
      setStores(storeList);
    } catch (err) {
      setError('Failed to load stores');
      console.error('Load stores error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    setSelectedStore(''); // Reset store selection
    setStores([]); // Clear stores list
  };

  const handleSearch = async () => {
    if (!selectedStore) {
      setError('Please select a store');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchSlotPolicies(currentEnvironment, selectedStore);
      if (response.success) {
        setPolicies(response.data);
        setIsModalOpen(true);
      } else {
        setError(response.error || 'Failed to fetch policies');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Search className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Search Slot Policy</h2>
          <p className="text-gray-600">Search for existing slot policies</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <select
            value={selectedClient}
            onChange={handleClientChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.client_id}
              </option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              disabled={isLoading || !stores.length}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select a store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={isLoading || !selectedStore}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          <Search className="w-4 h-4" />
          <span>{isLoading ? 'Searching...' : 'Search Policies'}</span>
        </button>
      </div>

      <JsonPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        jsonData={policies}
      />
    </div>
  );
}