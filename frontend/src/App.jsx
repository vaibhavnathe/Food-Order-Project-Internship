import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import Footer from "./components/layouts/Footer";
import Menu from "./components/layouts/Menu";
import Cart from "./components/cart/Cart";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../src/components/users/Register'
import Login from "./components/users/Login";
import store from './store'
import { loadUser } from "./action/userAction";
import Profile from './components/users/Profile'
import UpdateProfile from "./components/users/UpdateProfile";

export default function App() {

  // dipatched exactly once when the component is first rendered , and check if user is authenticated or not
  // console.log(store);

  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <BrowserRouter>
      <div className="App">

        <Header />

        <div className="container container-fluid">
          <Routes>

            <Route path="/" element={<Home />}/>
            <Route path="/eats/stores/:id/menus" element={<Menu/>}/>
            <Route path="/users/signup" element={<Register/>} />
            <Route path="/users/login" element={<Login/>} />
            <Route path="/users/me" element={<Profile/>} />
            <Route path="/users/me/update" element={<UpdateProfile/>} />

          </Routes>
        </div>

        <Footer />

      </div>
    </BrowserRouter>


  );
}
