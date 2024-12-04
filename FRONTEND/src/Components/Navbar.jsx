import {Container, Flex, Text, Link, HStack} from '@chakra-ui/react'

const NavBar = () => {
    return(
        <Container maxW={"100%"} border='1px' borderColor='#000' bg={"#fff"} px={20} m={0}>
            <Flex
                minh= {16}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={0}
                flexDir={{
                    base:"column",
                    sm:"row"
                }}
            >
                <Text 
                    color={"#000"} 
                    fontSize="50px"
                >
                    <Link 
                        to={"/"}
                        style={{
                            textDecoration: "none"
                        }}
                    >
                        STITCH.
                    </Link>
                </Text>
                <HStack spacing={4} alignItems={"center"}>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            HOME
                        </Link>
                    </Text>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            CATEGORIES
                        </Link>
                    </Text>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            CART
                        </Link>
                    </Text>
                    <Text 
                        color={"#000"} 
                        fontSize="20"
                    >
                        <Link 
                            to={"/"}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            LOGIN
                        </Link>
                    </Text>
                </HStack>
                
            </Flex>
        </Container>
    )
}

export default NavBar;