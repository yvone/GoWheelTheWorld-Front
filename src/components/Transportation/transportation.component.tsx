import * as React from "react"
import {
  Text,
  VStack,
  Heading,
  HStack,
  Box,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  RadioGroup,
  Radio
} from "@chakra-ui/react"
import { ITransportation } from "./transportation.types";
import {useState} from 'react'

function Transportation(props: ITransportation): JSX.Element {

    const [transport, setTransport] = useState<any>([
    {
        question: "Transportation is wheelchair accessible",
        answer: ''
    },
    {
        question: "Transportation is not wheelchair accessible but assistance will be provided for transfers.",
        answer: ''
    },
    {
        question: "If needed, your wheelchair can be stored safely inside the vehicle",
        answer: ''
    },
    {
        question: "Is transportation included in this tour/activity?",
        answer: ''
    }])

    console.log(transport)

    function changeValue(e: any, index: any){
        let newArray: any[] = [...transport];
        newArray[index].answer = e.target.value;
        setTransport(newArray)
    }

    return(
        <Box boxShadow='2xl'
            w="65%" 
            h="full"
            p={10}
            background="#EBE9E9"
            borderRadius="10px">

            <VStack alignItems='flex-start' w="full">
                <Text fontSize='20px' color='#3F6FE4'> Accesibility / Transportation </Text>
                <Heading fontSize='35px'>Transportation</Heading>

                <HStack justifyContent="flex-end" w="93%">
                    <HStack w="15%" spacing={31}>
                        <Text color="#4F6FE4"> Yes </Text>
                        <Text color="#4F6FE4"> No </Text>
                    </HStack>
                </HStack>

                    <Table bg="white" borderRadius={10} w='90%'>
                        <Tbody>
                            <Tr>
                                <Td >Transportation is wheelchair accessible</Td>
                                <Td>
                                    <RadioGroup value = {transport[0].answer} >
                                        <HStack spacing={8} justifyContent='flex-end'>
                                            <Radio  value='yes'
                                                    border='1px'
                                                    borderColor='#2F6FE4' onChange={(e) => changeValue(e, 0)}></Radio>
                                            <Radio  value='no'
                                                    border='1px'
                                                    borderColor='#2F6FE4' onChange={(e) => changeValue(e, 0)}></Radio>
                                        </HStack>
                                    </RadioGroup>
                                </Td>
                            </Tr>
                            <Tr fontSize="16px">
                                <Td>
                                    <Text>Transportation is not wheelchair accessible but assistance will be</Text>
                                    provided for transfers.
                                </Td>
                                <Td>
                                    <RadioGroup value = {transport[1].answer}>
                                        <HStack spacing={8} justifyContent='flex-end'>
                                            <Radio  value='yes'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 1)}></Radio>
                                            <Radio  value='no'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 1)}></Radio>
                                        </HStack>
                                    </RadioGroup>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td >If needed, your wheelchair can be stored safely inside the vehicle</Td>
                                <Td>
                                    <RadioGroup value = {transport[2].answer}>
                                        <HStack spacing={8} justifyContent='flex-end'>
                                            <Radio  value='yes'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 2)}></Radio>
                                            <Radio  value='no'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 2)}></Radio>
                                        </HStack>
                                    </RadioGroup>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Is transportation included in this tour/activity?</Td>
                                <Td>
                                    <RadioGroup value = {transport[3].answer}>
                                        <HStack spacing={8} justifyContent='flex-end'>
                                            <Radio  value='yes'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 3)}></Radio>
                                            <Radio  value='no'
                                                    border='1px'
                                                    borderColor='#2F6FE4'
                                                    onChange={(e) => changeValue(e, 3)}></Radio>
                                        </HStack>
                                    </RadioGroup>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                
            </VStack>
        </Box>
	);
}
export default Transportation;