interface ITableRow {
  name: string;
  iso: string;
  yearData?: { [k: string]: number | string };
}

export function TableRow({ name, iso, yearData }: ITableRow) {
  return (
    <tr>
      <td className="border-1 p-2">{name}</td>
      <td className="border-1 p-2">{iso ?? 'N/A'}</td>
      <td className="border-1 p-2">{yearData?.year}</td>
      <td className="border-1 p-2">{yearData?.population ?? 'N/A'}</td>
      {yearData &&
        Object.entries(yearData).map(([param, value]) => {
          if (param === 'year' || param === 'population') return;
          return (
            <td className="border-1 p-2" key={param}>
              {value ?? 'N/A'}
            </td>
          );
        })}
    </tr>
  );
}
