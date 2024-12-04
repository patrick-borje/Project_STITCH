import {Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";
import {useState} from 'react';
import { useProductStore } from "../store/product";
import { create } from "zustand";
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        size: "",
        price: "",
        stock: "",
        image: "",
    });

const {createProduct} = useProductStore();
const toast = useToast();
const handleAddProduct = async() => {
    const { success, message } = await createProduct(newProduct)
    console.log("success: ", success)
    console.log("Message: ", message)
    if(!success){
        toast({
            title: "Error",
            description: message,
            status: "error",
            isClosable: true,
        })
    }else{
        toast({
            title: "Success",
            description: message,
            status: "success",
            isClosable: true,
        })
    }
    setNewProduct({name: "",
        description: "",
        size: "",
        price: "",
        stock: "",
        image: "",})
}



    return (
        <Container>
            <Heading>Create Product</Heading>
            <Box 
                w={"full"}
                border="1px"
                borderColor="#000"
                p={6}
                rounder={"lg"}
                >
                <VStack spacing={4}>
                    <Input
                        placeholder ="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input
                        placeholder ="Product Description"
                        name="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                    <Input
                        placeholder ="Product Size"
                        name="size"
                        
                        value={newProduct.size}
                        onChange={(e) => setNewProduct({...newProduct, size: e.target.value})}
                    />
                    <Input
                        placeholder ="Product Price"
                        name="Price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input
                        placeholder ="Product Stock"
                        name="stopck"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                    <Input
                        placeholder ="Product Image Link "
                        name="image"
                        
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <Button colorScheme="gray" onClick={handleAddProduct} w='full'>Create</Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default CreatePage;