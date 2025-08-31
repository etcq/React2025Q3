import axios, { type AxiosResponse } from 'axios';
import type { IResponseData } from '../interfaces';

export async function getCO2data(): Promise<AxiosResponse<IResponseData>> {
  return await axios.get(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
}
