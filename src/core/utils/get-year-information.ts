import type {
  IResponseData,
  IYearData,
  ICountryDataPerYearList,
} from '@interfaces';
import { getYearFilteredData } from './get-year-filtered-data';

export function getCountryInformationPerYear(
  information: IResponseData,
  columns: string[],
  currentYear?: number
): ICountryDataPerYearList {
  const countryInformation: ICountryDataPerYearList = {};
  Object.entries(information).map(([country, data]) => {
    const filteredPerYear = data.data.filter((yearData: IYearData) => {
      return yearData.year === currentYear;
    });
    const yearData = !currentYear
      ? data.data[data.data.length - 1]
      : filteredPerYear[0];
    if (yearData) {
      countryInformation[country] = {
        isoCode: data.iso_code,
        yearInformation: getYearFilteredData(yearData, [
          'year',
          'population',
          ...columns,
        ]),
      };
    }
  });
  return countryInformation;
}
