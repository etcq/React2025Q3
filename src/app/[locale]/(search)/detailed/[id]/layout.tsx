import type { IChildrenNode } from '../../../../../core/interfaces/interface';
import style from './layout.module.scss';
import { Link } from '../../../../../i18n/navigation.ts';
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
