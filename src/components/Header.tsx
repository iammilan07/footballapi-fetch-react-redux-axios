import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box
      margin="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        height="auto"
        width="100px"
        // borderRadius="full"
        // boxSize="150px"
        src="./img/download.png"
        alt="Premier League Logo"
      />
      <Text
        fontSize="50px"
        fontWeight="600"
        lineHeight="80px"
        color="#37003c"
        as="b"
      >
        Premier League 2020/21
      </Text>
    </Box>
  );
};

export default Header;
