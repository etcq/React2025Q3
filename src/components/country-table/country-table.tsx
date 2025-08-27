import { getCO2data } from '@/core/services/co2';
import { useEffect, useState, type ChangeEvent } from 'react';
import { TableRow } from '../table-row/table-row';
import type { ICountryDataPerYearList } from '@/core/interfaces';
import { ColumnControls } from '../column-controls/column-controls';
import { getCountryInformationPerYear } from '@/core/utils/get-year-information';
import { useDebounce } from '@uidotdev/usehooks';

export default function CountryTable() {
  const [data, setData] = useState<ICountryDataPerYearList>();
  const [currentYear, setCurrentYear] = useState<number | undefined>();
  const [selectCols, setSelectedCols] = useState([
    'population',
    'co2',
    'co2_per_capita',
  ]);
  const debouncedYear = useDebounce(currentYear, 400);

  useEffect(() => {
    getCO2data()
      .then((data) => data.data)
      .then((information) => {
        const result = getCountryInformationPerYear(
          information,
          selectCols,
          debouncedYear
        );
        setData(result);
      });
  }, [selectCols, debouncedYear]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 4) {
      setCurrentYear(+e.target.value);
    }
  };

  return (
    <>
      <ColumnControls
        selectCols={selectCols}
        setSelectedCols={setSelectedCols}
      />
      <table className="border-1">
        <thead>
          <tr>
            <th className="border-1 p-2">Country</th>
            <th className="border-1 p-2">iso</th>
            <th className="border-1 p-2">
              year:{' '}
              <input
                className="bg-slate-600 rounded-2xl ps-2 text-slate-50"
                placeholder="input year"
                onChange={handleChange}
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
    </>
  );
}
