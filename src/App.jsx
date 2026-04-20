import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;