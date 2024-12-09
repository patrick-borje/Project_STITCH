import axios from 'axios';
import { FaCartPlus } from "react-icons/fa";
import { IconButton } from '@chakra-ui/react';

const AddToCartButton = ({ userId, product }) => {
   
    const handleAddToCart = async () => {
      
        try {
            console.log(userId)
            console.log(product)
            const response = await axios.post('/api/cart/add-to-cart', {
                userId,
                product,
                quantity: 1,
            },{withCredentials: true});
           
            console.log('Cart updated:', response.data.cart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return <IconButton onClick={handleAddToCart} icon={<FaCartPlus />}/>
};

export default AddToCartButton;