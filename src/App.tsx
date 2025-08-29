import { Suspense, lazy } from 'react';
import Loading from './components/loading/loading';

const CountryTable = lazy(
  () => import('@components/country-table/country-table')
);

export default function App() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<Loading />}>
        <CountryTable />
      </Suspense>
    </div>
  );
}
