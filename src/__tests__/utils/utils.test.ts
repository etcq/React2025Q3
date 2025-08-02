import { describe, expect, it } from 'vitest';
import { convertToCSV } from '../../core/utils/convert-to-csv.ts';
import { response } from '../../mocks/mock-data.ts';

describe('Utils', () => {
  it('should convert array of characters to CSV format', () => {
    const result = convertToCSV([response.characters[0]]);

    expect(result).toBe(
      'gender;id;image;name;species;status\nMale;1;https://rickandmortyapi.com/api/character/avatar/1.jpeg;Rick Sanchez;Human;Alive'
    );
  });

  it('should handle empty input', () => {
    // optional: поведение не определено в исходной функции
    expect(() => convertToCSV([])).toThrow(); // или вернёт undefined/error
  });
});
