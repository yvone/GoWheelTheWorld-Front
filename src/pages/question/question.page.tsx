import React from 'react';
import { Routes, useNavigate, Outlet, useLocation} from 'react-router-dom';

import {
  VStack,
  Flex,
  Stack,
  ChakraProvider,
  useBreakpointValue,
  HStack,
  Container,
  Box,
  Divider
} from "@chakra-ui/react";

import { IQuestion } from './question.types';
import Summary from '../../components/summary/summary.component';

import { 
    LateralMenu,
 } from '../../components';

 
import Header from './Header';
import Footer from './Footer';

import {links} from '../../reducers/appSlice'

function Question(props: any): JSX.Element {
      const navigate = useNavigate();


      const screenSize = useBreakpointValue({ base: 'true', md: 'false', lg:'false' })
      function CheckSize(screenSize:any){
          if (screenSize=='false')
              return (
                      <Summary />
                  )
      }

    function change(){
        
        navigate('/tour-operator/1/tour-completed/1')
    }

    const location = useLocation();
    const link: string[] = location.pathname.split('/')
    const idTourOperator: string = link[link.length - 4]
    links(idTourOperator)
	return (
	<React.Fragment>
        <Flex overflowX='hidden' h="100%">
            <HStack w="full" h="full" >
                <Box  h='full' position='absolute'>
                    <LateralMenu />
                </Box>
                
                <VStack h="100%" w="100%" alignItems="flex-end">
                    <Box w='92%' h="16%" marginLeft='2%'>
                        <Header/>
                    </Box>
                    <Box h="68%" w="100%">
                        <HStack justifyContent="center" 
                                w="full" 
                                spacing={47} 
                                alignItems='flex-start' 
                                marginLeft='3.5%'
                                height='calc(100vh - 190px)'
                                overflowY='scroll'>
                            <Outlet />
                            {CheckSize(screenSize)}
                        </HStack>
                    </Box>

                    <Box w={[ "90%", "90%", "92%", "94%", "96%", "96.8%"]} marginLeft={'6%'} justifyContent="flex-end">
                        {Footer(idTourOperator)}
                    </Box>
                </VStack>
            </HStack>
        </Flex>
    </React.Fragment>
	);
}

export default Question;