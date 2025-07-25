import { BrowserRouter, Route, Routes } from 'react-router';
import Search from './pages/search/search';
import { CharacterDetailed } from './components/character-detailed/character-detailed';
import ErrorMessage from './components/error-message/error-message';
import { MainLayout } from './components/main-layout/main-layout';
import { AboutMe } from './pages/about/about';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Search />}>
            <Route path="/detailed/:id" element={<CharacterDetailed />} />
          </Route>
          <Route path="about" element={<AboutMe />} />
          <Route path="*" element={<ErrorMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
