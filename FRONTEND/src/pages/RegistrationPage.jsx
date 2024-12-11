import { Box, Container, Heading, VStack, FormControl, FormLabel, Input, HStack, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const RegistrationPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "customer",
    });

    const { firstName, lastName, email, password, role } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

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
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/users/register",
                { ...inputValue },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }

        setInputValue({
            ...inputValue,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
        });
    };

    return (
        <Container maxW="lg" p={6} bg="gray.50" borderRadius="lg" shadow="lg" mt="10" mb="10">
            <VStack spacing={6} align="stretch" justify="center" w="full">
                <Heading as="h2" textAlign="center" size="xl" color="black.500">
                    Create a New Account
                </Heading>
                <Box bg="white" p={6} borderRadius="md" shadow="md" w="full">
                    <VStack spacing={6} align="stretch">
                        <HStack spacing="35px" w="full" justify="space-between">
                            <FormControl isRequired>
                                <FormLabel htmlFor="firstName" fontWeight="bold">
                                    First Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleOnChange}
                                    placeholder="John"
                                    borderColor="black.300"
                                    focusBorderColor="black.500"
                                    _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                                    size="lg"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="lastName" fontWeight="bold">
                                    Last Name
                                </FormLabel>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleOnChange}
                                    placeholder="Doe"
                                    borderColor="black.300"
                                    focusBorderColor="black.500"
                                    _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                                    size="lg"
                                />
                            </FormControl>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email" fontWeight="bold">
                                Email Address
                            </FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder="example@email.com"
                                borderColor="black.300"
                                focusBorderColor="black.500"
                                _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                                size="lg"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="password" fontWeight="bold">
                                Password
                            </FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="••••••"
                                borderColor="black.300"
                                focusBorderColor="black.500"
                                _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                                size="lg"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="role" fontWeight="bold">
                                Role
                            </FormLabel>
                            <Input
                                type="text"
                                name="role"
                                value={role}
                                disabled
                                onChange={handleOnChange}
                                placeholder="Admin / User"
                                borderColor="black.300"
                                focusBorderColor="black.500"
                                _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                                size="lg"
                            />
                        </FormControl>
                        <Button
                          
                            size="lg"
                            onClick={handleSubmit}
                            w="full"
                            mt={4}
                            _hover={{ bg: "teal.600" }}
                            _active={{ bg: "teal.700" }}
                        >
                            Register
                        </Button>
                        <Text mt={4} textAlign="center">
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "black.500", fontWeight: "bold" }}>
                                Login here
                            </Link>
                        </Text>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default RegistrationPage;
