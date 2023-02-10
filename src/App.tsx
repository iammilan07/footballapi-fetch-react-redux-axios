import { Box } from "@chakra-ui/react";
import React from "react";
import "./App.css";
import Header from "./components/Header";

import Ui from "./page/Ui";

function App() {
  return (
    <Box width="100%">
      <Header />
      <Ui />
    </Box>
  );
}

export default App;
