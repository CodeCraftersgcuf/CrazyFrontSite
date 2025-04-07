import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Layout from './layout/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./pages/home/Home";
import { GameCategoryPage } from "./pages/GameCategoryPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GamePage } from "./pages/GamePage";
import Favorite from "./pages/Favorite";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="category/:category" element={<GameCategoryPage />} />
            <Route path="category/:category/:id" element={<GamePage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </QueryClientProvider>
  )
}

export default App
