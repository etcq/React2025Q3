import { TableCell } from '@components';
import styles from './table-row.module.scss';
import { memo } from 'react';

interface ITableRow {
  name: string;
  iso: string;
  yearData?: { [k: string]: number | string };
}

const TableRow = memo(function TableRow({ name, iso, yearData }: ITableRow) {
  return (
    <tr className={styles['table-row']}>
      <td>{name}</td>
      <td>{iso ?? 'N/A'}</td>
      <td>{yearData?.year}</td>
      <TableCell key={`${name}_population`}>
        {yearData?.population ?? 'N/A'}
      </TableCell>
      {yearData &&
        Object.entries(yearData).map(([param, value]) => {
          if (param === 'year' || param === 'population') return;
          return (
            <TableCell key={`${name}_${param}`}>{value ?? 'N/A'}</TableCell>
          );
        })}
    </tr>
  );
});

export { TableRow };
