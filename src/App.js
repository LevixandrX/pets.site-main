import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/main';
import Header from './components/header';
import Footer from './components/footer';
import AnimalDetail from './pages/animalDetail';
import Registration from './pages/registration';
import Search from './pages/search';
import Profile from './pages/profile';
import CreateAd from './pages/createAd';
import PrivateRoute from './components/privateRoute';
import About from './pages/about';
import Contact from './pages/contact';
import Privacy from './pages/privacy';
import animals from './components/animals';

const App = () => {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path={"/"} element={<Main animals={animals} />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/privacy"} element={<Privacy />} />
          <Route path={"/registration"} element={<Registration />} />
          <Route path={"/profile"} element={<PrivateRoute element={<Profile />} />} />
          <Route path={"/add-order"} element={<CreateAd />} />
          <Route path={"/search"} element={<Search animals={animals} />} />
          <Route path={"/search/animal/:id"} element={<AnimalDetail />} />
          <Route path={"/animal/:id"} element={<AnimalDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;