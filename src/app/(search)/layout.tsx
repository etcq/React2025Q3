import Search from '../../components/search/search';
import { IChildrenNode } from '../../core/interfaces/interface';

export default function SearchLayout({ children }: IChildrenNode) {
  return <Search>{children}</Search>;
}
