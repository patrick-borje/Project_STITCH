import axios from 'axios';
import { FaAlignCenter, FaCartPlus } from "react-icons/fa";
import { Button, IconButton, textDecoration, useToast } from '@chakra-ui/react';
import {Link} from 'react-router-dom';

const AddToCartButton = ({ userId, product }) => {
    
    const toast = useToast();
    const handleAddToCart = async () => {
    
        try {
            const response = await axios.post('/api/cart/add-to-cart', {
                userId,
                product,
                quantity: 1,
            },{withCredentials: true});
            toast({
                title: "Item Added to Cart",
                status: "success",
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast({
                title: "Oops!",
                description: `Please log in first before adding items to the cart.`,
                status: "error",
                isClosable: true,
            });
        }
    };

    return <IconButton onClick={handleAddToCart} icon={<FaCartPlus />}/>
};

export default AddToCartButton;