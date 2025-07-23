import { BrowserRouter, Route, Routes } from 'react-router';
import Search from './pages/search/search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
