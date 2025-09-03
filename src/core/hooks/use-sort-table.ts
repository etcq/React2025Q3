import { useMemo, useState } from 'react';
import type { ICountryDataPerYearList } from '../interfaces';

export function useSortTable() {
  const [sortedData, setSortedData] = useState<
    ICountryDataPerYearList | undefined
  >();
  const [isDescPopulation, setIsDescPopulation] = useState(false);
  const [isDescName, setIsDescName] = useState(false);

  const sortByName = () => {
    setIsDescName(!isDescName);
    setSortedData(sortedDataByName);
  };

  const sortByPopulation = () => {
    setIsDescPopulation(!isDescPopulation);
    setSortedData(sortedDataByPopulation);
  };

  const sortedDataByName = useMemo(() => {
    if (!sortedData) return;
    const sortedDataset = Object.fromEntries(
      Object.entries(sortedData).sort(([country], [nextCountry]) =>
        !isDescName
          ? country.toLowerCase().localeCompare(nextCountry.toLowerCase())
          : nextCountry.toLowerCase().localeCompare(country.toLowerCase())
      )
    );
    return sortedDataset;
  }, [sortedData, isDescName]);

  const sortedDataByPopulation = useMemo(() => {
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
    return sortedDataset;
  }, [sortedData, isDescPopulation]);

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
