import { type FC, useRef } from 'react';
import styles from './flyout-characters.module.scss';
import { useSelectCharactersStore } from '../../core/stores/select-characters-store.ts';
import Button from '../ui/button/button.tsx';
import { convertToCSV } from '../../core/utils/convert-to-csv.ts';

export const FlyoutCharacters: FC = () => {
  const { characters, unselectAllCharacters } = useSelectCharactersStore(
    (state) => state
  );
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

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
      className={`${styles.flyout} ${characters.length === 0 && styles.hidden}`}
      data-testid="flyout"
      style={{ visibility: characters.length === 0 ? 'hidden' : 'visible' }}
    >
      <h2>{characters.length} Selected Characters</h2>
      <div className={styles['flyout-buttons']}>
        <Button callback={unselectAllCharacters}>Unselect All</Button>
        <Button callback={downloadCharactersInfo}>Download</Button>
      </div>

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
