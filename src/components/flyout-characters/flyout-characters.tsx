'use client';

import { useRef } from 'react';
import styles from './flyout-characters.module.scss';
import { useSelectCharactersStore } from '../../core/stores/select-characters-store.ts';
import Button from '../ui/button/button.tsx';
import { convertToCSV } from '../../core/utils/convert-to-csv.ts';
import { useTranslations } from 'next-intl';

export default function FlyoutCharacters() {
  const f = useTranslations('FlyoutCharacters');
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
      className={styles.flyout}
      data-testid="flyout"
      style={{ visibility: characters.length === 0 ? 'hidden' : 'visible' }}
    >
      <h2>
        {characters.length} {f('selected')}
      </h2>
      <div className={styles['flyout-buttons']}>
        <Button callback={unselectAllCharacters}>{f('unselect')}</Button>
        <Button callback={downloadCharactersInfo}>{f('download')}</Button>
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
}
