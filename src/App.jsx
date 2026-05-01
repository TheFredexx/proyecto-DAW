import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Detalle de libro */}
        <Route path="/book/:id" element={<BookDetailPage />} />

        {/* 🔥 Ruta fallback (evita errores si URL no existe) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;