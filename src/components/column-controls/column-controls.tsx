import { columnNames } from '@/core/constants';
import type { SetStateAction } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface IColumnControlsProps {
  selectCols: string[];
  setSelectedCols: React.Dispatch<SetStateAction<string[]>>;
}

export function ColumnControls({
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

  return (
    <div className="ms-2 my-2 border-2 h-120 ">
      <div className="bg-slate-700 text-slate-200 text-2xl ">
        Add columns...
      </div>
      <div className=" h-113 overflow-scroll overflow-x-hidden p-1">
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
    </div>
  );
}
