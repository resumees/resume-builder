import React from "react";
import { useSelector } from "react-redux";
import Finances from "./layouts/Finances";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./layouts/Navbar";
import { RootState } from "./store";

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.global.authentication);

  return (
    <ChakraProvider>
      <div className="flex flex-col h-screen w-full">
        <div className="h-24 w-full">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full flex-grow">
          {isAuthenticated ? <Finances /> : <p>Please log in</p>}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default App;