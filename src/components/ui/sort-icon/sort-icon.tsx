import { memo } from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

interface ISortIcon {
  isDesc: boolean;
}

export const SortIcon = memo(function SortIcon({ isDesc }: ISortIcon) {
  return !isDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />;
});
