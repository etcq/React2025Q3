import { getCO2data } from '@/core/services/co2';
import { useEffect, useState, type ChangeEvent } from 'react';
import { TableRow } from '../table-row/table-row';
import type { ICountryDataPerYearList } from '@/core/interfaces';
import { ColumnControlsModal } from '../column-controls-modal/column-controls-modal';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';
import { getSearchedCountries } from '@/core/utils/get-searched-countries';

export default function CountryTable() {
  const [data, setData] = useState<ICountryDataPerYearList>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | undefined>();
  const [searchName, setSearchName] = useState<string | undefined>();
  const [selectCols, setSelectedCols] = useState([
    'population',
    'co2',
    'co2_per_capita',
  ]);
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
        setData(result);
      });
  }, [selectCols, debouncedYear, debouncedName]);

  const handleChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 4) {
      setCurrentYear(+value);
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <table className="m-2">
        <thead>
          <tr>
            <th className="border-1 p-2 w-65">
              Country:
              <input
                className="bg-slate-600 ms-0.5 rounded-2xl ps-2 text-slate-50 w-40"
                placeholder="input name"
                onChange={handleChangeName}
              />
            </th>
            <th className="border-1 p-2 w-15">iso</th>
            <th className="border-1 p-2 w-30">
              year:{' '}
              <input
                className="bg-slate-600 rounded-2xl ps-2 text-slate-50 w-25"
                placeholder="input year"
                onChange={handleChangeYear}
              />
            </th>
            {selectCols.map((col) => {
              return (
                <th className="border-1 p-2" key={col}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.entries(data).map(([country, data], index) => {
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
