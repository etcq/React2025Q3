import type { Character } from '../interfaces/index.ts';

export const convertToCSV = (data: Character[]) => {
  const header = Object.keys(data[0]).join(';');
  const charactersData = data.map((char) => {
    return Object.values(char).join(';');
  });

  return [header, ...charactersData].join('\n');
};
