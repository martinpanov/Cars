import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";
import { RenderIf } from "./components/RenderIf";
import { PrivateRoute } from "./components/RouteGuards/PrivateRoute";
import { PublicRoute } from "./components/RouteGuards/PublicRoute";
import { UserContext } from "./contexts/UserContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { About } from "./pages/About/About";
import { Catalog } from "./pages/Catalog/Catalog";
import { Details } from "./pages/Details/Details";
import { Edit } from "./pages/Edit/Edit";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Logout } from "./pages/Logout/Logout";
import { MyProfile } from "./pages/MyProfile/MyProfile";
import { NotFound } from "./pages/NotFound/NotFound";
import { Register } from "./pages/Register/Register";
import { RentCar } from "./pages/RentCar/RentCar";
import { Sell } from "./pages/Sell/Sell";

function App() {
  const { user, setUser } = useSessionStorage("user", undefined);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <React.Fragment>
      <UserContext.Provider value={{ user, setUser }}>
        <Toaster position="top-right" reverseOrder={true} />

        <RenderIf condition={!isAuthPage}>
          <Navigation />
        </RenderIf>

        <main style={{ minHeight: "100vh" }}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/rentcar" element={<RentCar />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/:id" element={<Details />} />
            <Route element={<PrivateRoute />}>
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
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
