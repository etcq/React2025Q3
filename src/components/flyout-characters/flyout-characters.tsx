import { type FC, use, useRef } from 'react';
import styles from './flyout-characters.module.scss';
import { useCharactersStore } from '../../core/stores/stores.ts';
import ThemeContext from '../../core/contexts/contexts.ts';
import Button from '../ui/button/button.tsx';
import { convertToCSV } from '../../core/utils/convert-to-csv.ts';

export const FlyoutCharacters: FC = () => {
  const characters = useCharactersStore((state) => state.characters);
  const { theme } = use(ThemeContext);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const unselectAllCharacters = useCharactersStore(
    (state) => state.unselectAllCharacters
  );

  const downloadCharactersInfo = () => {
    const csvData = convertToCSV(characters);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.click();
      URL.revokeObjectURL(url);
    }
  };
  return (
    <div
      className={`${styles.flyout} ${styles[theme]} ${characters.length === 0 && styles.hidden}`}
      data-testid="flyout"
      style={{ visibility: characters.length === 0 ? 'hidden' : 'visible' }}
    >
      <h2>{characters.length} Selected Characters</h2>
      <Button callback={unselectAllCharacters}>Unselect All</Button>
      <Button callback={downloadCharactersInfo}>Download</Button>
      <a
        ref={downloadRef}
        download={`${characters.length}_items.csv`}
        style={{ display: 'none' }}
      >
        download
      </a>
    </div>
  );
};
