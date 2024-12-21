'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import { createSlotPolicy } from '@/services/api';
import { SlotPolicyForm } from './SlotPolicyForm';
import { JsonPreviewModal } from '@/components/ui/JsonPreviewModal';

export function SlotPolicyCreate() {
  const { currentEnvironment } = useEnvironment();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<any>(null);

  const handleSubmit = async (formData: any, selectedClient: string) => {
    if (!selectedClient) {
      setError('Please select a client');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await createSlotPolicy(currentEnvironment, selectedClient, formData);
      if (response.success) {
        setGeneratedJson(response.data);
        setIsModalOpen(true);
      } else {
        setError(response.error || 'Failed to create policy');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Create policy error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Create Slot Policy</h2>
          <p className="text-gray-600">Configure new slot policy for Nebula</p>
        </div>
      </div>

      <SlotPolicyForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />

      <JsonPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          // Aquí podrías agregar lógica adicional después de crear exitosamente
        }}
        jsonData={generatedJson}
      />
    </div>
  );
}

export default SlotPolicyCreate;