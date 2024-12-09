import { Box, Heading, HStack, IconButton, Text } from "@chakra-ui/react"
import { FaCartPlus } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({product, userId}) => {
    console.log(product, userId)
    return(
        <Box
            shadow='lg'
            rounder='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={ {transform: "translateY(-5)", shadow: 'xl'}}    
        >
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                
                <Text fontWeight='bold' fontSize='xl' mb={4}>
                    ${product.price}
                </Text>
                <HStack>
                  <AddToCartButton product={product._id} userId={userId}/>
                </HStack>


            </Box>

        </Box>
    )
}

export default ProductCard