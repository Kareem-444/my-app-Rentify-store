import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Tools from "../pages/Tools";
import ToolDetails from "../pages/ToolDetails";
import Favorites from "../pages/Favorites";
import MyTools from "../pages/MyTools";
import AddNewTool from "../pages/AddNewTool";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PageTransition from "./PageTransition";

const AnimatedRoutes = () => (
  <Routes>
    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
    <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
    <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
    <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
    <Route path="/tools/:id" element={<PageTransition><ToolDetails /></PageTransition>} />
    <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
    <Route path="/mytools" element={<PageTransition><MyTools /></PageTransition>} />
    <Route path="/add" element={<PageTransition><AddNewTool /></PageTransition>} />
    <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
    <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
    <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
    <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
    <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
    <Route path="*" element={<PageTransition><Home /></PageTransition>} />
  </Routes>
);

export default AnimatedRoutes;