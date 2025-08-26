import { Suspense, lazy } from 'react';

const CountryTable = lazy(
  () => import('@components/country-table/country-table')
);

export default function App() {
  return (
    <div className="flex justify-center">
      <Suspense fallback={<p>Loading....</p>}>
        <CountryTable />
      </Suspense>
    </div>
  );
}
