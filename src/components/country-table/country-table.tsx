import { getCO2data } from '@/core/services/co2';
import { useEffect, useState, type ChangeEvent } from 'react';
import { TableRow } from '../table-row/table-row';
import { ColumnControlsModal } from '../column-controls-modal/column-controls-modal';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';
import { getSearchedCountries } from '@/core/utils/get-searched-countries';
import { useSortTable } from '@/core/hooks/use-sort-table';
import type { ICountryDataPerYearList } from '@/core/interfaces';
import { FaSortAmountDown } from 'react-icons/fa';
import { FaSortAmountDownAlt } from 'react-icons/fa';

export default function CountryTable() {
  const [dataset, setDataset] = useState<ICountryDataPerYearList>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | undefined>();
  const [searchName, setSearchName] = useState<string | undefined>();
  const [selectCols, setSelectedCols] = useState(['co2', 'co2_per_capita']);
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

  const handleChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 4 || value.length === 0) {
      setCurrentYear(+value);
    }
  };

  const handleSortByPopulation = () => {
    sortByPopulation();
  };

  const handleSortByName = () => {
    sortByName();
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <table className="m-2">
        <thead>
          <tr>
            <th className="border-1 p-2 bg-slate-400">
              <div className="flex items-center justify-center">
                <div
                  onClick={handleSortByName}
                  className="hover:cursor-pointer flex items-center hover:text-emerald-400"
                >
                  {!isDescName ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
                  Country:
                </div>
                <input
                  className="bg-slate-600 ms-1 rounded-2xl ps-2 text-slate-50 w-40"
                  placeholder="input name"
                  onChange={handleChangeName}
                />
              </div>
            </th>
            <th className="border-1 p-2 w-15 bg-slate-400">iso</th>
            <th className="border-1 p-2 w-30 bg-slate-400">
              year:{' '}
              <input
                className="bg-slate-600 rounded-2xl ps-2 text-slate-50 w-25"
                placeholder="input year"
                onChange={handleChangeYear}
              />
            </th>
            <th className="border-1 p-2 w-25 bg-slate-400">
              <div
                className="hover:cursor-pointer flex items-center hover:text-emerald-400"
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
                <th className="border-1 p-2 bg-slate-400" key={col}>
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
      <button
        className="bg-slate-700 m-2 text-slate-200 flex justify-center p-3 rounded-full hover:bg-slate-400 fixed bottom-10 right-20"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add data columns
      </button>

      <ColumnControlsModal
        isOpen={isModalOpen}
        selectCols={selectCols}
        setSelectedCols={setSelectedCols}
      />
    </>
  );
}
