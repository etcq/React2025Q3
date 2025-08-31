import { getCO2data } from '@services/co2';
import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';
import { TableRow } from '@components';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';
import { getSearchedCountries } from '@/core/utils/get-searched-countries';
import styles from './country-table.module.scss';
import type { ICountryDataPerYearList } from '@/core/interfaces';
import { useSortTable } from '@/core/hooks/use-sort-table';
import { SortIcon } from '../ui/sort-icon/sort-icon';

const CountryTable = memo(function CountryTable({
  selectCols,
}: {
  selectCols: string[];
}) {
  const [dataset, setDataset] = useState<ICountryDataPerYearList>();
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
    getCO2data()
      .then((data) => data.data)
      .then((dataset) => {
        const result = getCountryInformationPerYear(
          getSearchedCountries(dataset, debouncedName),
          selectCols,
          debouncedYear
        );
        setDataset(result);
      });
  }, [selectCols, debouncedYear, debouncedName]);

  useEffect(() => {
    setSortedData(dataset);
  }, [dataset, setSortedData]);

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
        <tbody>
          {sortedData &&
            Object.entries(sortedData).map(([country, data]) => {
              return (
                <TableRow
                  key={country}
                  name={country}
                  iso={data.isoCode}
                  yearData={data.yearInformation}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
});

export default CountryTable;
