import { Box, Container, Heading, VStack, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    HStack,
    Button, } from "@chakra-ui/react";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const RegistrationPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role:"",
    })

    const {firstName, lastName, email, password, role} = inputValue;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }

    const handleError = (err) => 
        toast({
            title: "Error",
            description: "There was an error while signing up",
            status: "error",
            isClosable: true,
        });
    
    const handleSuccess = (success) =>
        toast({
            title: "Success",
            description: "Thanks for signing up!",
            status: "success",
            isClosable: true,
        })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const { data } = await axios.post("http://localhost:5000/api/users/register", {
                ...inputValue
            },{withCredentials: true}
        );
        console.log(data);
        const {success, message} = data;
        if(success){
            handleSuccess(message);
            setTimeout(() => {
                navigate("/");
            }, 1000)
        }else{
            handleError(message);
        }
        }catch(error){
            console.log(error);
        }

        setInputValue({
            ...inputValue,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role:"",
        })

    }




    return(
        <Container>
            <Heading>This is the Registration Page</Heading>
            <Box>
                <VStack>
                    <HStack spacing='35px'>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">
                            First Name
                        </FormLabel>
                        <Input 
                        type="text" 
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">
                            Last Name
                        </FormLabel>
                        <Input 
                        type="text" 
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        />
                    </FormControl>
                    </HStack>
                    
                    <FormControl as="fieldset">
                        <FormLabel as="legend">
                            Email Address
                        </FormLabel>
                        <Input 
                        type="email" 
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">
                            Password
                        </FormLabel>
                        <Input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl as="fieldset">
                        <FormLabel as="legend">
                            Role
                        </FormLabel>
                        <Input 
                        type="text" 
                        name="role"
                        value={role}
                        onChange={handleOnChange}
                        />
                    </FormControl>
                  
                    <Button  onClick={handleSubmit}>Register</Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default RegistrationPage;