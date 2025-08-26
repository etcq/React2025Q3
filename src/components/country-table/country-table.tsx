import { getCO2data } from '@/core/services/co2';
import { useEffect, useState } from 'react';
import { TableRow } from '../table-row/table-row';
import type { ICountryDataPerYear } from '@/core/interfaces';
import { ColumnControls } from '../column-controls/column-controls';
import { getFilteredData } from '@/core/utils/get-filtered-data';

export default function CountryTable() {
  const [data, setData] = useState<Record<string, ICountryDataPerYear>>();
  const [selectCols, setSelectedCols] = useState([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);
  useEffect(() => {
    getCO2data()
      .then((data) => data.data)
      .then((information) => {
        const result: Record<string, ICountryDataPerYear> = {};
        console.log(selectCols);
        Object.entries(information).map(([country, data]) => {
          result[country] = {
            isoCode: data.iso_code,
            yearInformation: getFilteredData(data.data.pop(), selectCols),
          };
        });
        setData(result);
      });
  }, [selectCols]);

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
