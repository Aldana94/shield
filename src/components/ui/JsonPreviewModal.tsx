'use client';

import React from 'react';
import { X } from 'lucide-react';

interface JsonPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jsonData: any;
}

export function JsonPreviewModal({ isOpen, onClose, onConfirm, jsonData }: JsonPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview JSON Policy</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
}