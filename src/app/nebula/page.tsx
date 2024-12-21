'use client';

import PageWrapper from '@/components/PageWrapper';
import { NebulaScriptManager } from '@/components/scripts/NebulaScriptManager';

export default function NebulaPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Nebula Scripts</h2>
          <p className="text-gray-600">
            Select a script and operation to manage your Nebula configurations
          </p>
        </div>
        <NebulaScriptManager />
      </div>
    </PageWrapper>
  );
}