import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

import useData from "./hooks/useData";

// Layout
const Layout = ({ children, data }) => {
  return (
    <>
      <Navbar data={data?.navbar} />
      {children}
      <Footer data={data?.footer} />
    </>
  );
};

function App() {
  const { data, loading, error } = useData();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Error loading data
      </div>
    );
  }

  if (!data) return null;

  return (
    <BrowserRouter>
      <Layout data={data}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;