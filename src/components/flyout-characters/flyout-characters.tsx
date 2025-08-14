'use client';

import { useRef } from 'react';
import styles from './flyout-characters.module.scss';
import { useSelectCharactersStore } from '../../core/stores/select-characters-store.ts';
import Button from '../ui/button/button.tsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FlyoutCharacters() {
  const f = useTranslations('FlyoutCharacters');
  const { characters, unselectAllCharacters } = useSelectCharactersStore(
    (state) => state
  );
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

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
        <Link
          href={`/api/characters?count=${characters.length}&ids=${characters}`}
          download={''}
        >
          Download
        </Link>
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
