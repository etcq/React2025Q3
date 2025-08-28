import { TableCell } from '../table-cell/table-cell';
import styles from './table-row.module.scss';
interface ITableRow {
  name: string;
  iso: string;
  yearData?: { [k: string]: number | string };
}

export function TableRow({ name, iso, yearData }: ITableRow) {
  return (
    <tr className={styles['table-row']}>
      <td>{name}</td>
      <td>{iso ?? 'N/A'}</td>
      <td>{yearData?.year}</td>
      <TableCell>{yearData?.population ?? 'N/A'}</TableCell>
      {yearData &&
        Object.entries(yearData).map(([param, value]) => {
          if (param === 'year' || param === 'population') return;
          return <TableCell key={param}>{value ?? 'N/A'}</TableCell>;
        })}
    </tr>
  );
}
