import {React,useState} from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
const Signup = () => {
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [confirmpassword, setConfirmpassword] = useState();
     const [password, setPassword] = useState();
     const [pic, setPic] = useState();
  return (
    <VStack spacing="5px">
      {/* group elements together and apply a space between them. */}

      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
    </VStack>
  );
}

export default Signup