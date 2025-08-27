export function getYearFilteredData(
  data: { [k: string]: number | string },
  filter: string[]
): { [k: string]: number | string } {
  const result = filter.map((col) => {
    return [col, data[col] ?? 'N/A'] as const;
  });
  return Object.fromEntries<number | string>(result);
}
