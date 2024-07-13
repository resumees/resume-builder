import React from "react";
import { useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./layouts/Navbar";
import { RootState } from "./store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Sidebar from "./layouts/Sidebar";

const AuthenticatedRoutes: React.FC = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.global.authentication
  );

  return isAuthenticated ? <Outlet /> : <p>Please log in!</p>;
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <div className="flex flex-col h-screen w-full">
            <div className="w-full">
              <Navbar />
            </div>
            <div className="flex flex-col items-center justify-center text-center w-full flex-grow">
              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/apply" element={<h1>Applicant page</h1>} />
                <Route path="/dashboard" element={<AuthenticatedRoutes />}>
                  <Route path="campaign/*" element={<Sidebar />} />
                </Route>
                <Route path="/login" element={<p>Please log in</p>} />
              </Routes>
            </div>
          </div>
        </Router>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
