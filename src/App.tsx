// 'use client';

// import { BrowserRouter, Route, Routes } from 'react-router';
// import Search from './components/search/search';
// import { CharacterDetailed } from './components/character-detailed/character-detailed';
// import { MainLayout } from './components/main-layout/main-layout';
// import { AboutMe } from './components/about/about';
// import { NotFoundPage } from './components/not-found/not-found.tsx';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <Routes>
//           <Route path="" element={<MainLayout />}>
//             <Route path="" element={<Search />}>
//               <Route path="/detailed/:id" element={<CharacterDetailed />} />
//             </Route>
//             <Route path="about" element={<AboutMe />} />
//             <Route path="*" element={<NotFoundPage />} />
//           </Route>
//         </Routes>
//       </QueryClientProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
