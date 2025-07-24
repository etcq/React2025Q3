import { BrowserRouter, Route, Routes } from 'react-router';
import Search from './pages/search/search';
import { CharacterDetailed } from './components/character-detailed/character-detailed';
import ErrorMessage from './components/error-message/error-message';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}>
          <Route path=":id" element={<CharacterDetailed />} />
        </Route>
        <Route path="*" element={<ErrorMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
