'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { fetchSheetData, type AccessRecord } from '@/services/googleSheets';
import { Badge } from '@/components/ui/badge';

const ACCESS_SHEET_ID = 'your-sheet-id';
const ACCESS_RANGE = 'Sheet1!A1:F1000';

const columns = [
  { key: 'timestamp', title: 'Date & Time' },
  { key: 'userName', title: 'User Name' },
  { key: 'accessType', title: 'Access Type' },
  { key: 'location', title: 'Location' },
  {
    key: 'status',
    title: 'Status',
    render: (value: string) => {
      const colors = {
        approved: 'bg-green-100 text-green-800',
        denied: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
      };
      return (
        <Badge className={colors[value as keyof typeof colors]}>
          {value.toUpperCase()}
        </Badge>
      );
    }
  }
];

export function AccessList() {
  const [data, setData] = useState<AccessRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const records = await fetchSheetData<AccessRecord>(ACCESS_SHEET_ID, ACCESS_RANGE);
      setData(records);
    } catch (error) {
      console.error('Failed to load access records:', error);
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
      title="Access Records"
      onRefresh={loadData}
      isLoading={isLoading}
    />
  );
}