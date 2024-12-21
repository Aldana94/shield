'use client';

import React, { useState } from 'react';
import { ArrowRight, Save } from 'lucide-react';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import { environments } from '@/config/environments';

const OPERATIONAL_MODELS = [
  'PICK_AND_DELIVERY',
  'PICK_AND_DELIVERY_WITH_STORAGE',
  'PICK_AND_DELIVERY_WITH_STORAGE_NO_TRANSFER',
  'FULL_SERVICE',
  'PICK_AND_COLLECT',
  'PICK_AND_COLLECT_NO_TRANSFER',
  'ZONE_PICKING_AND_DELIVERY_WITH_STORAGE',
  'ZONE_PICKING_AND_COLLECT'
] as const;

interface FormData {
  name: string;
  operationalModel: string;
  slotType: 'STATIC' | 'EXPRESS';
  slotSize: string;
  expressDuration: string;
  dayCount: string;
  startHour: string;
  endHour: string;
}

interface SlotPolicyFormProps {
  onSubmit: (formData: any, selectedClient: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function SlotPolicyForm({ onSubmit, isLoading, error }: SlotPolicyFormProps) {
  const { currentEnvironment } = useEnvironment();
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    operationalModel: 'PICK_AND_COLLECT',
    slotType: 'STATIC',
    slotSize: '60',
    expressDuration: '60',
    dayCount: '6',
    startHour: '8',
    endHour: '14'
  });

  const clients = environments[currentEnvironment].clients.NEBULA[currentEnvironment];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateJson = () => {
    const slotDescriptions: any = {};
    const operationalModels = [formData.operationalModel];
    
    for (let day = 0; day < parseInt(formData.dayCount); day++) {
      for (let model of operationalModels) {
        if (!slotDescriptions[model]) {
          slotDescriptions[model] = {};
        }
        if (!slotDescriptions[model][day]) {
          slotDescriptions[model][day] = [];
        }

        if (formData.slotType === 'STATIC') {
          let currentHour = parseInt(formData.startHour);
          const endHour = parseInt(formData.endHour);
          const slotSize = parseInt(formData.slotSize);

          while (currentHour < endHour) {
            let nextHour = currentHour + slotSize / 60;
            if (nextHour > endHour) nextHour = endHour;

            const fromTime = `${String(currentHour).padStart(2, '0')}:00`;
            const duration = Math.round((nextHour - currentHour) * 60);

            const slot = {
              type: 'STATIC',
              from_local_time: fromTime,
              duration_in_minutes: duration,
              enabled: true,
            };

            slotDescriptions[model][day].push(slot);
            currentHour = nextHour;
          }
        } else {
          const slot = {
            type: 'EXPRESS',
            duration_in_minutes: parseInt(formData.expressDuration),
            enabled: true,
          };
          
          slotDescriptions[model][day].push(slot);
        }
      }
    }

    return {
      name: formData.name || 'Default Policy',
      active: true,
      priority: 0,
      slot_descriptions: slotDescriptions,
      dynamic_parameters: {},
      rules: [],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;
    const json = generateJson();
    await onSubmit(json, selectedClient);
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.storeId} value={client.storeId}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          {/* Resto de los campos del paso 1 */}
          {/* ... */}

          <button
            onClick={() => setStep(2)}
            disabled={!selectedClient}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Campos del paso 2 */}
          {/* ... */}

          <div className="flex space-x-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Creating...' : 'Create Policy'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}