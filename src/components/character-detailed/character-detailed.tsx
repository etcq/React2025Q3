import { type FC } from 'react';
import style from './character-detailed.module.scss';
// import type { Character } from '../../core/interfaces/interface.ts';

export const CharacterDetailed: FC<{
  id: number;
  setCharacter: (id: number) => void;
}> = ({ id, setCharacter }) => {
  // const [characterInfo, setCharacterInfo] = useState<Character>();
  return (
    <div className={style.detailed}>
      <h1>Character: {id}</h1>
      <button onClick={() => setCharacter(0)}>close</button>
    </div>
  );
};
