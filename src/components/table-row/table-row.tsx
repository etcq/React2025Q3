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
      <td>{yearData?.population ?? 'N/A'}</td>
      {yearData &&
        Object.entries(yearData).map(([param, value]) => {
          if (param === 'year' || param === 'population') return;
          return <td key={param}>{value ?? 'N/A'}</td>;
        })}
    </tr>
  );
}
