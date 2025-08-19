import { Search } from '@components';
import type { IChildrenNode } from '@interfaces';

export default function SearchLayout({ children }: IChildrenNode) {
  return <Search>{children}</Search>;
}
