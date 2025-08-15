import type { IChildrenNode } from '../../../../../core/interfaces/interface';
import style from './layout.module.scss';
export default function DetailedLayout({ children }: IChildrenNode) {
  return <div className={style.wrapper}>{children}</div>;
}
