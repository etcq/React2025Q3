import type { ICountryInformation } from '@interfaces';

export function getPopulation(data: ICountryInformation) {
  const lastData = data.data.pop();
  console.log(lastData);
  return lastData?.population;
}
