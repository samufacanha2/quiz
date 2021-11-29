import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
