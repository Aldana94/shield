'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { fetchSheetData, type ClientRecord } from '@/services/googleSheets';
import { Badge } from '@/components/ui/badge';

const CLIENTS_SHEET_ID = 'your-sheet-id';
const CLIENTS_RANGE = 'Sheet1!A1:F1000';

const columns = [
  { key: 'timestamp', title: 'Date & Time' },
  { key: 'clientName', title: 'Client Name' },
  { key: 'serviceType', title: 'Service' },
  { key: 'attendedBy', title: 'Attended By' },
  {
    key: 'status',
    title: 'Status',
    render: (value: string) => {
      const colors = {
        completed: 'bg-green-100 text-green-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return (
        <Badge className={colors[value as keyof typeof colors]}>
          {value.toUpperCase()}
        </Badge>
      );
    }
  }
];

export function ClientsList() {
  const [data, setData] = useState<ClientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const records = await fetchSheetData<ClientRecord>(CLIENTS_SHEET_ID, CLIENTS_RANGE);
      setData(records);
    } catch (error) {
      console.error('Failed to load client records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      title="Clients Records"
      onRefresh={loadData}
      isLoading={isLoading}
    />
  );
}