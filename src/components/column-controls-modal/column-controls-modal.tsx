import { columnNames } from '@/core/constants';
import type { SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { IoCheckmarkOutline } from 'react-icons/io5';
import styles from './column-controls-modal.module.scss';

interface IColumnControlsProps {
  isOpen: boolean;
  selectCols: string[];
  setSelectedCols: React.Dispatch<SetStateAction<string[]>>;
}

export function ColumnControlsModal({
  isOpen,
  selectCols,
  setSelectedCols,
}: IColumnControlsProps) {
  const handleSelectName = (colName: string) => {
    const index = selectCols.indexOf(colName);
    if (index === -1) {
      setSelectedCols([...selectCols, colName]);
    } else {
      setSelectedCols([...selectCols.filter((col) => col !== colName)]);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles['modal-header']}>Add columns...</div>
      <div className={styles['modal-list']}>
        {columnNames.map((name) => (
          <div
            key={name}
            className={styles['modal-list-item']}
            onClick={() => handleSelectName(name)}
          >
            {name}
            {selectCols.includes(name) && <IoCheckmarkOutline />}
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}
