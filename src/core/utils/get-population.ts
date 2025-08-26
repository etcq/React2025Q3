import type { ICountryInformation, IYearData } from '@interfaces';

export function getLastYearData(
  data: ICountryInformation
): IYearData | undefined {
  const lastData = data.data.pop();
  console.log(lastData);
  return lastData;
}
