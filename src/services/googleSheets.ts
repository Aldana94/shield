const GOOGLE_SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface AccessRecord {
  id: string;
  timestamp: string;
  userName: string;
  accessType: string;
  location: string;
  status: 'approved' | 'denied' | 'pending';
}

export interface ClientRecord {
  id: string;
  timestamp: string;
  clientName: string;
  serviceType: string;
  attendedBy: string;
  status: 'completed' | 'in-progress' | 'cancelled';
}

export async function fetchSheetData<T>(sheetId: string, range: string): Promise<T[]> {
  try {
    const response = await fetch(
      `${GOOGLE_SHEETS_API}/${sheetId}/values/${range}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }

    const data = await response.json();
    return transformSheetData<T>(data.values);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

function transformSheetData<T>(values: string[][]): T[] {
  const [headers, ...rows] = values;
  return rows.map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header.toLowerCase()] = row[index];
    });
    return obj as T;
  });
}