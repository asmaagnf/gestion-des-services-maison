import { Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Becomepro from "./pages/Becomepro/Becomepro";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Website/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/register"  element={<Register/>}/>
          <Route path="/pro" element={<Becomepro/>} />
          </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
  );
}

export default App;
