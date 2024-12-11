import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, userId }) => {
    return (
        <Box
            shadow="lg"
            borderRadius="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            {/* Add the image here */}
            <Image 
                src={product.image} 
                alt={product.name} 
                objectFit="contain" 
                width="100%" 
                height="350px" 
            />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight="bold" fontSize="xl" mb={4}>
                    ${product.price}
                </Text>

                <HStack>
                    <AddToCartButton product={product._id} userId={userId} />
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;
