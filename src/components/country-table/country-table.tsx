import { use, useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';
import { getSearchedCountries } from '@/core/utils/get-searched-countries';
import { useSortTable } from '@hooks/use-sort-table';
import styles from './country-table.module.scss';
import { CountryTableBody } from '@components';
import { SortIcon } from '../ui/sort-icon/sort-icon';
import type { IResponseData } from '@/core/interfaces';
import { getCO2Data } from '@/core/services/co2';

interface ITableProps {
  selectCols: string[];
}

const getDataPromise = getCO2Data();

export default function CountryTable({ selectCols }: ITableProps) {
  const dataset = use<IResponseData>(getDataPromise);
  const [currentYear, setCurrentYear] = useState<number | undefined>();
  const [searchName, setSearchName] = useState<string | undefined>();
  const {
    isDescName,
    isDescPopulation,
    sortByName,
    sortedData,
    setSortedData,
    sortByPopulation,
  } = useSortTable();
  const debouncedYear = useDebounce(currentYear, 400);
  const debouncedName = useDebounce(searchName, 400);

  useEffect(() => {
    if (!dataset) return;
    const result = getCountryInformationPerYear(
      getSearchedCountries(dataset, debouncedName),
      selectCols,
      debouncedYear
    );
    setSortedData(result);
  }, [dataset, setSortedData, selectCols, debouncedName, debouncedYear]);

  const handleChangeYear = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 4 || value.length === 0) {
      setCurrentYear(+value);
    }
  }, []);

  const handleSortByPopulation = useCallback(() => {
    sortByPopulation();
  }, [sortByPopulation]);

  const handleSortByName = useCallback(() => {
    sortByName();
  }, [sortByName]);

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  }, []);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['table-head-cell']}>
              <div className={styles.content}>
                <div
                  onClick={handleSortByName}
                  className={styles['content-sort-btn']}
                >
                  <SortIcon isDesc={isDescName} />
                  Country:
                </div>
                <input
                  className={styles['content-input']}
                  placeholder="input name"
                  onChange={handleChangeName}
                />
              </div>
            </th>
            <th className={styles['table-head-cell']}>iso</th>
            <th className={styles['table-head-cell']}>
              year:{' '}
              <input
                className={styles['content-input']}
                placeholder="input year"
                onChange={handleChangeYear}
              />
            </th>
            <th className={styles['table-head-cell']}>
              <div
                className={styles['content-sort-btn']}
                onClick={handleSortByPopulation}
              >
                <SortIcon isDesc={isDescPopulation} />
                Population
              </div>
            </th>
            {selectCols.map((col) => {
              return (
                <th className={styles['table-head-cell']} key={col}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <CountryTableBody sortedData={sortedData} />
      </table>
    </>
  );
}
