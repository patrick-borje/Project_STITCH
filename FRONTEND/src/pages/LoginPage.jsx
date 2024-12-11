import { Button, Container, FormControl, FormLabel, Heading, VStack, Input, Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

const LoginPage = () => {
    const [cookies, removeCookie] = useCookies([]);
    const toast = useToast();
    const hasShownToast = useRef(false); // Ref to track toast state
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post(
                "http://localhost:5000/api/users/",
                {},
                { withCredentials: true }
            );

            const { status, user } = data;
            setUserName(user);
            if (status) {
                if (!hasShownToast.current) {
                    toast({
                        title: "Success",
                        description: `You are already logged in!`,
                        status: "success",
                        isClosable: true,
                    });
                    hasShownToast.current = true; // Mark toast as shown
                    navigate('/');
                }
            } else {
                removeCookie("token");
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const handleError = (err) =>
        toast({
            title: "Error",
            description: "There was an error while logging in",
            status: "error",
            isClosable: true,
        });

    const handleSuccess = (success) =>
        toast({
            title: "Success",
            description: "Log in successful!",
            status: "success",
            isClosable: true,
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/users/login", {
                ...inputValue,
            }, { withCredentials: true });
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
            email: "",
            password: "",
        });
    };

    return (
        <Container
            maxW="lg"
            p={6}
            bg="gray.50"
            borderRadius="lg"
            shadow="lg"
            mt="10"
            mb="10"
        >
            <VStack spacing={6} align="stretch" justify="center" w="full">
                <Heading as="h2" textAlign="center" size="xl" color="black.500">
                    Login to Your Account
                </Heading>
                <Box
                    bg="white"
                    p={6}
                    borderRadius="md"
                    shadow="md"
                    w="full"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={4}
                >
                    <FormControl id="email" isRequired>
                        <FormLabel htmlFor="email" fontWeight="bold">Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter your email"
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                            size="lg"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel htmlFor="password" fontWeight="bold">Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter your password"
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
                        _active={{ bg: "black.700" }}
                    >
                        Login
                    </Button>
                    <Text mt={4}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#319795", fontWeight: "bold" }}>
                            Register here
                        </Link>
                    </Text>
                </Box>
            </VStack>
        </Container>
    );
};

export default LoginPage;
