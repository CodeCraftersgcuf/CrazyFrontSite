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

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Layout />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="category/:category" element={<GameCategoryPage />} />
            <Route path="category/:category/:id" element={<GamePage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
