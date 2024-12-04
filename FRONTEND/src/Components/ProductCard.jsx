import { Box, Heading, Text } from "@chakra-ui/react"

const ProductCard = ({product}) => {
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


            </Box>

        </Box>
    )
}

export default ProductCard