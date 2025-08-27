import { columnNames } from '@/core/constants';
import type { SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { IoCheckmarkOutline } from 'react-icons/io5';

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
    <div className="my-2 border-2 bg-slate-600 flex h-120 flex-col rounded-2xl overflow-hidden fixed bottom-25 right-5 w-85">
      <div className="bg-slate-700 text-slate-200 text-2xl p-2">
        Add columns...
      </div>
      <div className="overflow-scroll overflow-x-hidden p-1">
        {columnNames.map((name) => (
          <div
            key={name}
            className="flex flex-row justify-between mt-1 hover:cursor-pointer hover:bg-slate-600 bg-slate-400 p-3 rounded-2xl"
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
