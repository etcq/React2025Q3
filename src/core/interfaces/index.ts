export interface IYearData {
  [key: string]: string | number;
}

export interface ICountryInformation {
  iso_code: string;
  data: IYearData[];
}

export interface IResponseData {
  [k: string]: ICountryInformation;
}

export interface ICountryDataPerYear {
  isoCode: string;
  yearInformation: { [k: string]: number | string };
}

export type ICountryDataPerYearList = Record<string, ICountryDataPerYear>;
