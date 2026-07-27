import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Ecosystem from "./components/Ecosystem";
import Tokenomics from "./components/Tokenomics";
import Roadmap from "./components/Roadmap";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Ecosystem />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;