import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useEffect } from "react";
import {Link} from "react-router-dom"
import { useProductStore } from "../store/product.js";
import ProductCard from "../Components/ProductCard.jsx"


const HomePage = () => {

    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
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
                        <ProductCard key={product._id} product={product}/>
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