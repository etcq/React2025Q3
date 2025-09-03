import type { IResponseData } from '../interfaces';

export async function getCO2Data(): Promise<IResponseData> {
  const response = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch CO2 data');
  }
  return response.json();
}
