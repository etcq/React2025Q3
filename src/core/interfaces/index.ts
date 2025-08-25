export interface IYearData {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  cumulative_cement_co2: number;
}

export interface ICountryInformation {
  iso_code?: string;
  data: IYearData[];
}

export interface IResponseData {
  string: ICountryInformation;
}
