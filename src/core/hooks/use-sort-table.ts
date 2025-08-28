import { useState } from 'react';
import type { ICountryDataPerYearList } from '../interfaces';

export function useSortTable(dataset?: ICountryDataPerYearList) {
  const [sortedData, setSortedData] = useState(dataset);
  const [isDescending, setIsDescending] = useState(false);

  const toggleSorDirection = () => {
    setIsDescending(!isDescending);
  };

  const sortByName = () => {
    if (!sortedData) return;
    const sortedDataset = Object.fromEntries(
      Object.entries(sortedData).sort(([country], [nextCountry]) =>
        !isDescending
          ? country.toLowerCase().localeCompare(nextCountry.toLowerCase())
          : nextCountry.toLowerCase().localeCompare(country.toLowerCase())
      )
    );
    setSortedData(sortedDataset);
  };

  const sortByPopulation = () => {
    if (!sortedData) return;
    const sortedDataset = Object.fromEntries(
      Object.entries(sortedData).sort(([, data], [, nextData]) => {
        const population = +data.yearInformation.population;
        const nextPopulation = +nextData.yearInformation.population;
        if (!isDescending) {
          if (isNaN(population)) return 1;
          if (isNaN(nextPopulation)) return -1;
          return population - nextPopulation;
        }
        if (isNaN(population)) return -1;
        if (isNaN(nextPopulation)) return 1;
        return nextPopulation - population;
      })
    );
    setSortedData(sortedDataset);
  };

  return {
    isDescending,
    sortedData,
    toggleSorDirection,
    setSortedData,
    sortByName,
    sortByPopulation,
  };
}
