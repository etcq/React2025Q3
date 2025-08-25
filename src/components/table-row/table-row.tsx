interface ITableRow {
  name: string;
  iso: string;
  population?: number;
}

export function TableRow({ name, iso, population }: ITableRow) {
  return (
    <tr>
      <td className="border-1 p-2">{name}</td>
      <td className="border-1 p-2">{iso ?? 'N/A'}</td>
      <td className="border-1 p-2">{population ?? 'N/A'}</td>
    </tr>
  );
}
