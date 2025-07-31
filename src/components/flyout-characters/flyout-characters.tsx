import { type FC, use } from 'react';
import styles from './flyout-characters.module.scss';
import { useCharactersStore } from '../../core/stores/stores.ts';
import ThemeContext from '../../core/contexts/contexts.ts';
import Button from '../ui/button/button.tsx';

export const FlyoutCharacters: FC = () => {
  const characters = useCharactersStore((state) => state.characters);
  const { theme } = use(ThemeContext);
  const unselectAllCharacters = useCharactersStore(
    (state) => state.unselectAllCharacters
  );
  return (
    <div className={`${styles.flyout} ${styles[theme]}`} data-testid="flyout">
      <h2>{characters.length} Selected Characters</h2>
      <Button callback={unselectAllCharacters}>Unselect All</Button>
    </div>
  );
};
