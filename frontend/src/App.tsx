import React from "react";
import Finances from "./layouts/Finances";
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <div className="flex flex-col items-center justify-center min-h-screen text-center w-full">
        <Finances />
      </div>
    </ChakraProvider>
  );
};

export default App;
