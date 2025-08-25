import { getCO2data } from '@/core/services/co2';
import { useEffect, useState } from 'react';
import { TableRow } from '../table-row/table-row';
import type { IResponseData } from '@/core/interfaces';
import { getPopulation } from '@/core/utils/get-population';

export function CountryTable() {
  const [data, setData] = useState<IResponseData>();
  useEffect(() => {
    getCO2data().then((data) => {
      setData(data.data);
    });
  }, []);

  return (
    <table className="border-1">
      <thead>
        <tr>
          <th className="border-1 p-2">Country</th>
          <th className="border-1 p-2">iso</th>
          <th className="border-1 p-2">last population</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          Object.entries(data).map(([country, data], index) => {
            return (
              <TableRow
                key={index}
                name={country}
                iso={data.iso_code}
                population={getPopulation(data)}
              />
            );
          })}
      </tbody>
    </table>
  );
}
