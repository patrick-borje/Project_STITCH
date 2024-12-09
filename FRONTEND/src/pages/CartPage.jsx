import { Container, VStack, Text, SimpleGrid, useToast, Button} from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"
import axios from "axios";
import {Link} from "react-router-dom"
import { useProductStore } from "../store/product.js";
import { useCartItemsStore } from "../store/cartItems.js";

const CartPage = () => {    
    const toast = useToast();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUserName] = useState("");
    const {fetchCartItems, cartItems} = useCartItemsStore();
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
    

            if (status) {
                if (!hasShownToast.current) {
                    toast({
                        title: "Success",
                        description: `Cart Page`,
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
  
        fetchCartItems();
    }, [cookies, navigate, removeCookie, fetchCartItems]);

 

  
    


   

   
    console.log("Items in Cart", cartItems)


    return(
        <Container>This is the cart Page</Container>
    )
}

export default CartPage;