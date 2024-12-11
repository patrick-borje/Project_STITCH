import {
    Container,
    VStack,
    HStack,
    Text,
    SimpleGrid,
    useToast,
    Button,
    Box,
    Image,
    Divider,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useCartItemsStore } from "../store/cartItems.js";

const CartPage = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [id, setID] = useState("");
    const { fetchCartItems, cartItems } = useCartItemsStore();
    const hasShownToast = useRef(false); // Ref to track toast state

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post(
                "http://localhost:5000/api/users/",
                {},
                { withCredentials: true }
            );
            const { status, id } = data;
            setID(id);
            console.log("User ID: ", id);

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
    }, [cookies, navigate, removeCookie]);

    useEffect(() => {
        if (id) {
            fetchCartItems(id);
        }
    }, [id, fetchCartItems]);

    const newprods = cartItems?.products || [];
    console.log("cart Items", newprods);

    // Calculate total price
    const totalPrice = newprods.reduce((total, item) => {
        return total + item.productId?.price * item.quantity;
    }, 0);

    // Remove item from cart
    const removeItemFromCart = async (productId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/api/cart/remove-item/${id}/${productId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                toast({
                    title: "Item removed",
                    description: "The item was successfully removed from your cart.",
                    status: "success",
                    isClosable: true,
                });
                fetchCartItems(id); // Refresh the cart
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "There was an issue removing the item.",
                status: "error",
                isClosable: true,
            });
        }
    };

    // Update item quantity in cart
    const updateItemQuantity = async (productId, newQuantity) => {
        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/cart/update-item`,
                { productId, quantity: newQuantity },
                { withCredentials: true }
            );
    
            if (data.success) {
                toast({
                    title: "Quantity updated",
                    description: `The quantity of the item has been updated to ${newQuantity}.`,
                    status: "success",
                    isClosable: true,
                });
                fetchCartItems(id); // Refresh the cart after update
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "There was an issue updating the quantity.",
                status: "error",
                isClosable: true,
            });
        }
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:5000/api/cart/checkout/${id}`,
                {},
                { withCredentials: true }
            );
            if (data.success) {
                toast({
                    title: "Checkout Successful!",
                    description: "Your order has been placed.",
                    status: "success",
                    isClosable: true,
                });
                fetchCartItems(id); // Clear the cart
            }
        } catch (err) {
            toast({
                title: "Checkout Failed",
                description: "There was an issue with the checkout process.",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={6}>
            <VStack spacing={4} align="stretch">
                {newprods.length > 0 ? (
                    newprods.map((item, index) => (
                        <Box
                            key={index}
                            p={4}
                            borderWidth={1}
                            borderRadius="lg"
                            shadow="md"
                            _hover={{ shadow: "lg" }}
                        >
                            <HStack justify="space-between" align="center">
                                <HStack spacing={4}>
                                    {/* Product Image */}
                                    <Image
                                        boxSize="100px"
                                        objectFit="cover"
                                        src={item.productId?.image || "https://via.placeholder.com/150"}
                                        alt={item.productId?.name || "Product Image"}
                                        borderRadius="md"
                                    />
                                    <VStack align="start">
                                        <Text fontWeight="bold" fontSize="lg">
                                            {item.productId?.name || "N/A"}
                                        </Text>
                                        <Text>Price: ${item.productId?.price || "N/A"}</Text>
                                        <Text>Quantity: {item.quantity}</Text>
                                    </VStack>
                                </HStack>
                                <HStack>
                                    <Button
                                        colorScheme="yellow"
                                        size="sm"
                                        onClick={() => {
                                            const newQuantity = prompt(
                                                "Enter the new quantity:",
                                                item.quantity
                                            );
                                            if (
                                                newQuantity &&
                                                !isNaN(newQuantity) &&
                                                newQuantity > 0
                                            ) {
                                                updateItemQuantity(
                                                    item.productId._id,
                                                    parseInt(newQuantity)
                                                );
                                            } else {
                                                toast({
                                                    title: "Invalid quantity",
                                                    description:
                                                        "Please enter a valid quantity.",
                                                    status: "warning",
                                                    isClosable: true,
                                                });
                                            }
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() =>
                                            removeItemFromCart(item.productId._id)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </HStack>
                            </HStack>
                        </Box>
                    ))
                ) : (
                    <Text textAlign="center" fontSize="lg" color="gray.500">
                        Your cart is empty.
                    </Text>
                )}

                <Divider />

                {/* Checkout Section */}
                <HStack justify="space-between" align="center">
                    <Text fontSize="xl" fontWeight="bold">
                        Total: ${totalPrice.toFixed(2)}
                    </Text>
                    <Button
                        colorScheme="teal"
                        size="lg"
                        onClick={handleCheckout}
                        isDisabled={newprods.length === 0}
                    >
                        Checkout
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};

export default CartPage;