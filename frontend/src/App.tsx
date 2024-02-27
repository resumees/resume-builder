import React from "react";
import Finances from "./layouts/Finances";
import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className="flex flex-col items-center justify-center min-h-screen text-center w-full">
          <Finances />
        </div>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
