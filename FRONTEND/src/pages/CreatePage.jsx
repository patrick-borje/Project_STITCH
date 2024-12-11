import { Box, Button, Container, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from 'react';
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        size: "",
        price: "",
        stock: "",
        image: "",
    });

    const { createProduct } = useProductStore();
    const toast = useToast();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        console.log("success: ", success);
        console.log("Message: ", message);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
        }

        setNewProduct({
            name: "",
            description: "",
            size: "",
            price: "",
            stock: "",
            image: "",
        });
    };

    return (
        <Container maxW="lg" p={6} bg="gray.50" borderRadius="lg" shadow="lg" mt="10" mb="10">
            <VStack spacing={6} align="stretch" justify="center" w="full">
                <Heading as="h2" textAlign="center" size="xl" color="black.500">
                    Create a New Product
                </Heading>
                <Box
                    bg="white"
                    p={6}
                    borderRadius="md"
                    shadow="md"
                    w="full"
                    border="1px solid"
                    borderColor="black.100"
                >
                    <VStack spacing={4} align="stretch">
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Input
                            placeholder="Product Description"
                            name="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Input
                            placeholder="Product Size"
                            name="size"
                            value={newProduct.size}
                            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Input
                            placeholder="Product Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Input
                            placeholder="Product Stock"
                            name="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Input
                            placeholder="Product Image Link"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            borderColor="black.300"
                            focusBorderColor="black.500"
                            size="lg"
                            _focus={{ boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                        />
                        <Button
                            colorScheme="teal"
                            onClick={handleAddProduct}
                            w="full"
                            size="lg"
                            mt={4}
                            _hover={{ bg: "teal.600" }}
                            _active={{ bg: "teal.700" }}
                        >
                            Create Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
