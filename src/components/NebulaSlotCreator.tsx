'use client';

import React, { useState } from 'react';
import { Clock, ArrowRight, Save } from 'lucide-react';
import JsonPreviewModal from './JsonPreviewModal';

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

const NebulaSlotCreator = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    operationalModel: 'PICK_AND_COLLECT',
    slotType: 'STATIC',
    slotSize: '60',
    expressDuration: '60',
    dayCount: '6',
    startHour: '8',
    endHour: '14'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const json = generateJson();
    setGeneratedJson(json);
    setIsModalOpen(true);
  };

  return (
    <>
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

        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter policy name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operational Model
                </label>
                <select
                  name="operationalModel"
                  value={formData.operationalModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {OPERATIONAL_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slot Type
                </label>
                <select
                  name="slotType"
                  value={formData.slotType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="STATIC">Static</option>
                  <option value="EXPRESS">Express</option>
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {formData.slotType === 'STATIC' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slot Size (minutes)
                    </label>
                    <input
                      type="number"
                      name="slotSize"
                      value={formData.slotSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Hour (0-23)
                      </label>
                      <input
                        type="number"
                        name="startHour"
                        value={formData.startHour}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="23"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Hour (0-24)
                      </label>
                      <input
                        type="number"
                        name="endHour"
                        value={formData.endHour}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="24"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Express Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="expressDuration"
                    value={formData.expressDuration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Days (0-6)
                </label>
                <input
                  type="number"
                  name="dayCount"
                  value={formData.dayCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="6"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Create Policy</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <JsonPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          // Aquí iría la lógica para guardar el JSON
          console.log('Saving policy:', generatedJson);
          setIsModalOpen(false);
        }}
        jsonData={generatedJson}
      />
    </>
  );
};

export default NebulaSlotCreator;