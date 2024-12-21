'use client';

import React, { useState, useRef } from 'react';
import { Database, Upload, Download } from 'lucide-react';
import { useEnvironment } from '@/contexts/EnvironmentContext';
import { environments } from '@/config/environments';
import { generateBackup } from '@/services/backup';
import { JsonPreviewModal } from '@/components/ui/JsonPreviewModal';

export function SlotPolicyBackup() {
  const { currentEnvironment } = useEnvironment();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const content = e.target?.result as string;
        const storeIds = content.split('\n').map(line => line.trim()).filter(Boolean);
        
        const response = await generateBackup(currentEnvironment, storeIds);
        if (response.success) {
          setResults(response.data);
          setIsModalOpen(true);
        } else {
          setError(response.error || 'Failed to generate backup');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Backup error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const handleDownloadResults = () => {
    if (!results) return;

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slot-policies-backup-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Slot Policy Backup</h2>
          <p className="text-gray-600">Generate backups of slot policies from a list of store IDs</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Store IDs (CSV)
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              <Upload className="w-4 h-4" />
              <span>{isLoading ? 'Processing...' : 'Upload CSV'}</span>
            </button>
            {results && (
              <button
                onClick={handleDownloadResults}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Results</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>Upload a CSV file containing one store ID per line.</p>
          <p>The backup will be generated for all valid store IDs.</p>
        </div>
      </div>

      <JsonPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        jsonData={results}
      />
    </div>
  );
}