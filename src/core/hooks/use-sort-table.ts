import { useCallback, useEffect, useState } from 'react';
import type { ICountryDataPerYearList } from '../interfaces';

export function useSortTable(dataset?: ICountryDataPerYearList) {
  const [sortedData, setSortedData] = useState(dataset);
  const [isDescPopulation, setIsDescPopulation] = useState(false);
  const [isDescName, setIsDescName] = useState(false);

  useEffect(() => {
    setSortedData(dataset);
  }, [dataset]);

  const sortByName = useCallback(() => {
    setIsDescName(!isDescName);
    if (!sortedData) return;
    const sortedDataset = Object.fromEntries(
      Object.entries(sortedData).sort(([country], [nextCountry]) =>
        !isDescName
          ? country.toLowerCase().localeCompare(nextCountry.toLowerCase())
          : nextCountry.toLowerCase().localeCompare(country.toLowerCase())
      )
    );
    setSortedData(sortedDataset);
  }, [isDescName, sortedData]);

  const sortByPopulation = useCallback(() => {
    setIsDescPopulation(!isDescPopulation);
    if (!sortedData) return;
    const sortedDataset = Object.fromEntries(
      Object.entries(sortedData).sort(([, data], [, nextData]) => {
        const population = +data.yearInformation.population;
        const nextPopulation = +nextData.yearInformation.population;
        if (!isDescPopulation) {
          if (isNaN(population)) return -1;
          if (isNaN(nextPopulation)) return 1;
          return population - nextPopulation;
        }
        if (isNaN(population)) return 1;
        if (isNaN(nextPopulation)) return -1;
        return nextPopulation - population;
      })
    );
    setSortedData(sortedDataset);
  }, [isDescPopulation, sortedData]);

  return {
    isDescName,
    sortedData,
    isDescPopulation,
    setSortedData,
    sortByName,
    setIsDescPopulation,
    sortByPopulation,
  };
}
