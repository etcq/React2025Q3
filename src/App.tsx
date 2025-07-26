import { BrowserRouter, Route, Routes } from 'react-router';
import Search from './pages/search/search';
import { CharacterDetailed } from './components/character-detailed/character-detailed';
import { MainLayout } from './components/main-layout/main-layout';
import { AboutMe } from './pages/about/about';
import { NotFoundPage } from './pages/not-found/not-found.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Search />}>
            <Route path="/detailed/:id" element={<CharacterDetailed />} />
          </Route>
          <Route path="about" element={<AboutMe />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
