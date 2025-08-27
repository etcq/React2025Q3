import type { IResponseData, ICountryInformation } from '@interfaces';

export function getSearchedCountries(
  dataset: IResponseData,
  searchName?: string
) {
  return searchName
    ? Object.fromEntries<ICountryInformation>(
        Object.entries(dataset).filter(([country]) =>
          country.toLowerCase().includes(searchName.toLowerCase())
        )
      )
    : dataset;
}
