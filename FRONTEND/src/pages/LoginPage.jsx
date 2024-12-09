import { Button, Container, FormControl, FormLabel, Heading, VStack, Input } from "@chakra-ui/react";
import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import {useCookies} from "react-cookie"


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

    const { email, password} = inputValue;
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        })
    }

    useEffect(() => {
 
        const verifyCookie = async () => {
            
      
            const {data} = await axios.post(
                "http://localhost:5000/api/users/",
                {},
                {withCredentials:true}
            )
            
            const {status, user} = data;
            console.log("This is the data: " , data)
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
                    navigate('/')
                }
            } else {
                removeCookie("token");
            }
        };
        verifyCookie();
  
    }, [cookies, navigate, removeCookie, ]);

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
        })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post("http://localhost:5000/api/users/login", {
                ...inputValue,
            },{ withCredentials: true});
            console.log(data);
            const {success, message} = data;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }else{
                handleError(message);
            }
        }catch(error){
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email:"",
            password:"",
        });
    }

    return (
        <Container>
            <Heading>This is the Login Page</Heading>
            <VStack>
                <FormControl as='fieldset'>
                    <FormLabel as='legend'>Email</FormLabel>
                    <Input 
                    type="email"
                    name = "email"
                    value={email}
                    onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl as='fieldset'>
                    <FormLabel as='legend'>Password</FormLabel>
                    <Input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    />
                </FormControl>
                <Button onClick={handleSubmit}>Login</Button>
            </VStack>
        </Container>
    )
}

export default LoginPage;