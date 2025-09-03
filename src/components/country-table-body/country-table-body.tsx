import type { ICountryDataPerYearList } from '@/core/interfaces';
import { TableRow } from '@components';

interface ITableBody {
  sortedData?: ICountryDataPerYearList;
}

export function CountryTableBody({ sortedData }: ITableBody) {
  return (
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
  );
}
