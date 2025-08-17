import type { IChildrenNode } from '../../../../../../core/interfaces/interface.ts';
import { Link } from '../../../../../../i18n/navigation.ts';
import style from './detailed-layout.module.scss';
import { MdClose } from 'react-icons/md';

export default function DetailedLayout({ children }: IChildrenNode) {
  return (
    <div className={style.wrapper}>
      <Link className={style['back-btn']} href="/">
        <MdClose />
      </Link>
      {children}
    </div>
  );
}
