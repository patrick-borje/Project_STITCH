import {Container, Flex, Text, HStack, useToast , } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";

import axios from "axios";
const NavBar = () => {
    const toast = useToast();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {

        const verifyCookie = async () => {
            const {data} = await axios.post(
                "http://localhost:5000/api/users/",
                {},
                {withCredentials:true}
            )
        
      
        const {status} = data;

        if(status === true){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
        
        }


        verifyCookie();
    }, [cookies, removeCookie]);

    const handleLogout = () => {
        removeCookie("token");
        setIsLoggedIn(false);
        toast({
            title: "Success",
            description: `Logged Out Successful!`,
            status: "success",
            isClosable: true,
        });

    
   
    }

    return(
        <Container maxW={"100%"} border='1px' borderColor='#000' bg={"#fff"} px={20} m={0}>
            <Flex
                minh= {16}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={0}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Text 
                    color={"#000"} 
                    fontSize="50px"
                >
                    <Link 
                        to={"/"}
                        style={{
                            textDecoration: "none"
                        }}
                    >
                        STITCH.
                    </Link>
                </Text>
                <HStack spacing={4} alignItems={"center"}>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            HOME
                        </Link>
                    </Text>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/cart"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            CART
                        </Link>
                    </Text>
                   

                    <Text 
            color={"#000"} 
            fontSize="20"
        >

            
            <Link 
                to={isLoggedIn ? null : "/login"}
                style={{
                    textDecoration: "none"
                }}
                onClick={isLoggedIn ? handleLogout : null}
            >
                {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </Link>
        </Text>
                        
                 
                </HStack>
                
            </Flex>
        </Container>
    )
}

export default NavBar;