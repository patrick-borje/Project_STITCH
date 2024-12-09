import { Container, VStack, Text, SimpleGrid, useToast, Button} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"
import axios from "axios";
import {Link} from "react-router-dom"
import { useProductStore } from "../store/product.js";
import { useUserStore } from "../store/user.js";
import ProductCard from "../Components/ProductCard.jsx"


const HomePage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const {fetchProducts, products} = useProductStore();
    const {fetchUsers, users} = useUserStore();
    const hasShownToast = useRef(false); // Ref to track toast state

    useEffect(() => {
 
        const verifyCookie = async () => {
        
      
            const {data} = await axios.post(
                "http://localhost:5000/api/users/",
                {},
                {withCredentials:true}
            )
      
            const {status, user, id} = data;
            console.log("This is the data: " , data)
            setUserID(id);
            setUserName(user);
            if (status) {
                if (!hasShownToast.current) {
                    toast({
                        title: "Success",
                        description: `Hello ${user}!`,
                        status: "success",
                        isClosable: true,
                    });
                    hasShownToast.current = true; // Mark toast as shown
                }
            } else {
                removeCookie("token");
            }
        };
        

        verifyCookie();
        fetchProducts();
        fetchUsers();
    }, [cookies, navigate, removeCookie, fetchProducts, fetchUsers]);

    const Logout = () => {
        removeCookie("token");
        toast({
            title: "Success",
            description: "You have Logged out!",
            status: "success",
            isClosable: true,
        })
    }

  
    


   

   
    console.log("products", products)

    return(
        <Container maxW="container.xl" py={12}>
        
          
           

        

            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgClip={"text"}
                    textAlign={"center"}
                    color={"black"}
                >
                    Current Products
                </Text>

                <SimpleGrid
                    columns={{
                        base:1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} userId={userID}/>
                    ))}
                </SimpleGrid>

                <Text
                    fontSize='xl'
                    fontWeight={"bold"}
                    textAlign={"center"}
                    color={"black"}
                >
                    No Products Available at this Moment {""}
                    <Link to={"/create"}>
                        <Text
                            as='span' color={'blue.500'} _hover={{textDecoration:"underline"}}
                        >
                            Create a product
                        </Text>
                    </Link>
                </Text>

            </VStack>
        </Container>
    )
}

export default HomePage;