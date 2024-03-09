import React from "react";
import { useSelector } from "react-redux";
import Finances from "./layouts/Finances";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./layouts/Navbar";
import { RootState } from "./store";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Comparison from "./layouts/Comparison";

const AuthenticatedRoutes: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.global.authentication);

  return isAuthenticated ? <Outlet /> : <p>Please log in</p>;
};

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <div className="flex flex-col h-screen w-full">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex flex-col items-center justify-center text-center w-full flex-grow">
            <Routes>
              <Route path="/" element={<AuthenticatedRoutes />}>
                <Route index element={<h1>Home page</h1>} />
                <Route path="/finances/visualise" element={<Finances />} />
                <Route path="/finances/comparison/*" element={<Comparison />} />
              </Route>
              <Route path="/login" element={<p>Please log in</p>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;