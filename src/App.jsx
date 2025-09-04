import React from "react";
import MyTools from './pages/MyTools';
import AddNewTool from './pages/AddNewTool';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetails from './pages/ToolDetails';
import Favorites from './pages/Favorites';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RentalCheckoutPage from './pages/RentalCheckoutPage';
import ChatPage from './pages/ChatPage';
import { ToolsProvider } from './context/ToolsContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <ToolsProvider>
      <FavoritesProvider>
        <div className="bg-emerald-950 text-white min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-2 sm:p-4 bg-emerald-950">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
                <Route path="/tools/:id" element={<PageTransition><ToolDetails /></PageTransition>} />
                <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
                <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                <Route path="/sign" element={<PageTransition><SignUpPage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/my-tools" element={<PageTransition><MyTools /></PageTransition>} />
                <Route path="/add-tool" element={<PageTransition><AddNewTool /></PageTransition>} />
                <Route path="/rent/:id" element={<PageTransition><RentalCheckoutPage /></PageTransition>} />
                <Route path="/chat/:ownerId" element={<PageTransition><ChatPage /></PageTransition>} />
                <Route path="*" element={<div style={{color:'#fff',textAlign:'center',marginTop:64}}><h1>404 - Page Not Found</h1></div>} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </ToolsProvider>
  );
}

export default App;