import React from 'react';
import {
  Text,
  VStack,
  Heading,
  Flex,
  Button,
  ChakraProvider,
  Container,
  Image,
  HStack,
  Link,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { IMainScreenTO } from './mainScreenTO.types';
import ImageInfoMSTO from './ImageInfoMSTO.png';
import fondoMS from './FondoMS.png';

function MainScreenTO(props: IMainScreenTO): JSX.Element {
	return (
    <ChakraProvider>
      <Container maxWidth="full">
        <Flex h="100vh">
          <Box bgImage={`url(${fondoMS})`} w="full" h="full" bgSize={"cover"}>
            <HStack justifyContent="center" w="full" h="full">
              <Box  w="35%" 
                    h="65%"
                    bgColor="white"
                    p={5}
                    borderRadius={20} 
                    marginRight="100" >
                <VStack alignItems="flex-start">
                  <HStack>
                    <VStack alignItems="flex-start" spacing={6}>
                      <Heading fontSize='30px'> New tour </Heading>
                      <Text fontSize='25px'> People with disabilities are already booking tours and activities through our platform. Become a certified partner! </Text>
                    </VStack>
                    <Image src={ImageInfoMSTO} w="30%"/>
                  </HStack>
                  <Text fontSize='25px'> How to become a Wheel the World Partner? </Text>
                  <HStack>
                    <Text fontSize='22px'> 1 </Text>
                    <Text fontSize='22px'> Access to any mobile device or computer </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize='22px'> 2 </Text>
                    <Text fontSize='22px'> Follow the steps on the app </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize='22px'> 3 </Text>
                    <Text fontSize='22px'> Our team will take care of the rest </Text>
                  </HStack>
                  <HStack justifyContent="center" w="full" p={3}>
                    <Button size='md'
                            height='80px'
                            width='200px'
                            fontSize='30px'> 
                      Let's start! </Button>
                  </HStack>
                </VStack>
              </Box>
              <Box  w="35%" 
                    h="65%"
                    bgColor="white"
                    p={5}
                    borderRadius={20} 
                    marginLeft="100">
                <Heading marginBottom={5} fontSize='30px'> Tour registered </Heading>
                <Text fontSize='25px'> Bike ride in Manhattan </Text>
                <HStack w="full" spacing={6}>
                  <HStack w="full">
                    <Slider defaultValue={30} isReadOnly={true}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                    </Slider>
                    <Text fontSize='22px'> 30% </Text>
                  </HStack>
                  <Button size='lg'> Continue </Button>
                  <DeleteIcon w={6} h={6} />
                </HStack>
                <Text fontSize='25px'> Snorkel with whale sharks </Text>
                <HStack w="full" spacing={6}>
                  <HStack w="full">
                    <Slider defaultValue={70} isReadOnly={true}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                    </Slider>
                    <Text fontSize='22px'> 70% </Text>
                  </HStack>
                  <Button size='lg'> Continue </Button>
                  <DeleteIcon w={6} h={6} />
                </HStack>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </Container>
		</ChakraProvider>
	);
}

export default MainScreenTO;