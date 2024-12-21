'use client';

import React, { useState } from 'react';
import { Terminal, Download, Upload, Database } from 'lucide-react';
import { SlotPolicyList, SlotPolicyCreate } from './nebula/slot-policy';
import { SlotPolicyBackup } from './nebula/slot-policy-backup';

type ScriptType = 'slot-policy' | 'slot-policy-backup';
type OperationType = 'get' | 'put' | 'backup';

const scripts = {
  'slot-policy': {
    name: 'Slot Policy',
    description: 'Manage time slots configuration and availability',
    operations: ['get', 'put'] as const
  },
  'slot-policy-backup': {
    name: 'Slot Policy Backup',
    description: 'Generate and manage backups of slot policies',
    operations: ['backup'] as const
  }
} as const;

export function NebulaScriptManager() {
  const [selectedScript, setSelectedScript] = useState<ScriptType | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<OperationType | null>(null);

  const renderScriptComponent = () => {
    if (!selectedScript || !selectedOperation) return null;

    switch (selectedScript) {
      case 'slot-policy':
        return selectedOperation === 'get' 
          ? <SlotPolicyList /> 
          : <SlotPolicyCreate />;
      case 'slot-policy-backup':
        return <SlotPolicyBackup />;
      default:
        return null;
    }
  };

  const renderOperationButtons = (scriptKey: ScriptType, operations: readonly string[]) => {
    return operations.map(operation => {
      let Icon = Download;
      let label = operation.toUpperCase();

      if (operation === 'put') {
        Icon = Upload;
      } else if (operation === 'backup') {
        Icon = Database;
      }

      return (
        <button
          key={operation}
          onClick={() => {
            setSelectedOperation(operation as OperationType);
            setSelectedScript(scriptKey);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(scripts).map(([key, script]) => (
          <div
            key={key}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedScript === key ? 'border-blue-500 shadow-md bg-blue-50' : 'hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{script.name}</h3>
              <Terminal className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-4">{script.description}</p>
            <div className="flex gap-2">
              {renderOperationButtons(key as ScriptType, script.operations)}
            </div>
          </div>
        ))}
      </div>

      {renderScriptComponent()}
    </div>
  );
}