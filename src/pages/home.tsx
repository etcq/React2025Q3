import Loading from '@/components/loading/loading';
import { Suspense, useState } from 'react';
import styles from './home.module.scss';
import { ColumnControlsModal } from '@/components';
import CountryTable from '@/components/country-table/country-table';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectCols, setSelectedCols] = useState(['co2', 'co2_per_capita']);

  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<Loading />}>
        <CountryTable selectCols={selectCols} />
      </Suspense>
      <ColumnControlsModal
        isOpen={isModalOpen}
        selectCols={selectCols}
        setSelectedCols={setSelectedCols}
      />
      <button
        className={styles['col-control-btn']}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add data columns
      </button>
    </div>
  );
}
