// src/App.js

import React from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { StateContext } from "./context/AuthContext.js";
import {Login} from "./pages/auth";
import Dashboard from "./pages/Dashboard.jsx";

import { CategoryList, SettingList, UserList } from "./pages/Settings";
import PrivateRoute from "./PrivateRoute.js";

function App() {
  return (
    <Router>
      <Toaster/>
      <StateContext>

      <Layout>
        <Routes>
            <Route path="/login" element={<Login/>}/>         
            {/* <Route path="/signup" element={<Signup/>}/>          */}
            <Route path="/" element={<Dashboard/>}/>         
    
            <Route path="/ajustes" element={<PrivateRoute><SettingList /></PrivateRoute>}/>         
            <Route path="/ajustes/categorias" element={<PrivateRoute><CategoryList /></PrivateRoute>}/>         
            <Route path="/ajustes/usuarios" element={<PrivateRoute><UserList /></PrivateRoute>}/>         
          </Routes>
      </Layout>
      </StateContext>
    </Router>
  );
}
export default App;