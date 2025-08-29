import { getCO2data } from '@services/co2';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { TableRow } from '../table-row/table-row';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';
import { getSearchedCountries } from '@/core/utils/get-searched-countries';
import { useSortTable } from '@hooks/use-sort-table';
import type { ICountryDataPerYearList } from '@/core/interfaces';
import { FaSortAmountDown } from 'react-icons/fa';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import styles from './country-table.module.scss';

export default function CountryTable({ selectCols }: { selectCols: string[] }) {
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
                  {!isDescName ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
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
                {!isDescPopulation ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountDownAlt />
                )}
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
            Object.entries(sortedData).map(([country, data], index) => {
              return (
                <TableRow
                  key={index}
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
}
