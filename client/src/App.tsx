import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { UserContext } from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import { RenderIf } from "./components/RenderIf";
import { Navigation } from "./components/Navigation/Navigation";
import { PublicRoute } from "./components/RouteGuards/PublicRoute";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Catalog } from "./pages/Catalog/Catalog";
import { RentCar } from "./pages/RentCar/RentCar";
import { About } from "./pages/About/About";
import { Details } from "./pages/Details/Details";
import { PrivateRoute } from "./components/RouteGuards/PrivateRoute";
// import { Edit } from "./pages/Edit/Edit";
import { Sell } from "./pages/Sell/Sell";
import { MyProfile } from "./pages/MyProfile/MyProfile";
import { Logout } from "./pages/Logout/Logout";
import { NotFound } from "./pages/NotFound/NotFound";
import { Footer } from "./components/Footer/Footer";

function App() {
  const { user, setUser } = useSessionStorage("user", undefined);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <React.Fragment>
      <UserContext.Provider value={{ user, setUser }}>
        <Toaster
          position="top-right"
          reverseOrder={true}
        />

        <RenderIf condition={!isAuthPage}>
          <Navigation />
        </RenderIf>

        <main>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/rentcar' element={<RentCar />} />
            <Route path='/about' element={<About />} />
            <Route path='/details/:id' element={<Details />} />
            <Route element={<PrivateRoute />}>
              {/* <Route path='/edit/:id' element={<Edit />} /> */}
              <Route path='/sell' element={<Sell />} />
              <Route path='/myprofile' element={<MyProfile />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </UserContext.Provider>

      <RenderIf condition={!isAuthPage}>
        <Footer />
      </RenderIf>
    </React.Fragment>
  );
}

export default App;
