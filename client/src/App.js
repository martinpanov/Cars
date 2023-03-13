import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Catalog from './components/Catalog/Catalog';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sell from './components/Sell/Sell';
import Buy from './components/Buy/Buy';
import NotFound from './components/NotFound/NotFound';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

function App() {
    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/sell' element={<Sell />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/search' element={<Buy />} />
                    <Route path='/details' element={<Details />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='*' element={<NotFound />} />

                </Routes>

            </main>

            <Footer />

        </>
    );
}

export default App;
