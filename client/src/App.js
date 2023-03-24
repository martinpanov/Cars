import './App.css';
import Home from './components/Home/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { UserContext } from './contexts/UserContext';
import useSessionStorage from './hooks/useSessionStorage';
import Logout from './components/Logout/Logout';

function App() {
    const [user, setUser] = useSessionStorage("user", null);
    const location = useLocation();

    return (
        <>
            <UserContext.Provider value={[user, setUser]}>

                {(location.pathname === '/login' || location.pathname === '/register') ? null : <Navigation />}

                <main>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/sell' element={<Sell />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/search' element={<Buy />} />
                        <Route path='/details' element={<Details />} />
                        <Route path='/edit' element={<Edit />} />
                        <Route path='*' element={<NotFound />} />

                    </Routes>

                </main>

            </UserContext.Provider>

            {(location.pathname === '/login' || location.pathname === '/register') ? null : <Footer />}
        </>
    );
}

export default App;