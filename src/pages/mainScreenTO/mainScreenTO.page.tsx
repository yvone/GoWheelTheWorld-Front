import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  VStack,
  Heading,
  Flex,
  Button,
  Image,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Box,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  ChakraProvider,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Skeleton,
  Stack,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IMainScreenTO } from "./mainScreenTO.types";
import ImageInfoMSTO from "./ImageInfoMSTO.png";
import sillaDeRuedas from "./sillaDeRuedas.png";
import ImgFondo from "./maldives-1993704.jpg";
import TopMenu from "../../components/TopMenu/topMenu.component";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { links } from "../../reducers/appSlice";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../firebase/firebase-auth"

function MainScreenTO(props: IMainScreenTO): JSX.Element {
  /* ALERT DIALOG ------------------------------*/
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
      if(user && !loading){
        axios.get(`https://api-things-to-do.herokuapp.com/tour-operator/info/${user.uid}`)
        .then(result =>{
        })
        .catch(error => {
          if(error.response.data.document === "No document"){
            axios.get(`https://api-things-to-do.herokuapp.com/admin/info/${user.uid}`)
            .then(result => {
              navigate(`/admin/${user.uid}`)
            })
            .catch(error => {
              console.log(error)
            })
          }
        })
      }
      else if(!loading && !user){
        navigate("/")
    }
    },[user, loading])

  function cambiarPag(idTour: string) {
    navigate(
      `/tour-operator/${idTourOperator}/question/${idTour}/name-of-tour`
    );
  }

  function createTour(event: any) {
    event.preventDefault();
    const url = `https://api-things-to-do.herokuapp.com/tour-operator/create-tour/${idTourOperator}`;
    axios
      .post(url, {})
      .then((result) => {
        let value = result.data.id;
        console.log("JIJIJ", result.data.id);
        cambiarPag(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //const tamanoBox = useBreakpointValue({ base: "100%", md: "80%", lg: "100%" });
  const spacing = useBreakpointValue({ base: "-4", md: "", lg: "-4" });
  const botonContinue = useBreakpointValue({ base: "md", md: "sm", lg: "md" });
  const fSBContinue = useBreakpointValue({ base: "", md: "10px", lg: "14px" });

  const location = useLocation();
  const link: string[] = location.pathname.split("/");
  const idTourOperator: string = link[link.length - 1];

  console.log(idTourOperator);

  let [indexValue, setIndex] = useState<any>(0);
  const [tours, setTours] = useState<any>([]);
  const [status, setStatus] = useState<string>("idle");
  // status: 'idle' | 'loading' | 'succeeded' | 'failed'

  /* GET ----------------------------------------*/
  const url = `https://api-things-to-do.herokuapp.com/tour-operator/all-tours/${idTourOperator}`;
  useEffect(() => {
    setStatus("loading");
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        setTours(result.data);
        setIndex(result.data);

        setStatus("succeeded");
      })
      .catch((error) => {
        console.log(error);
        setStatus("failed");
      });
  }, []);

  console.log(tours);
  console.log(status);
  console.log(tours.length);

  const goToTour = (idTour: string) => {
    links(idTour);
    navigate(
      `/tour-operator/${idTourOperator}/question/${idTour}/name-of-tour`
    );
  };

  function refresh() {
    window.location.reload();
  }

  function deleteTour(event: any) {
    console.log("-----", indexValue);
    console.log("elimina----->", tours[indexValue].id);

    let idTour = tours[indexValue].id;

     event.preventDefault();
     const url = `https://api-things-to-do.herokuapp.com/tour-operator/delete-tour/${idTour}`;
     axios
       .put(url, {})
       .then((result) => {
         console.log("JIJIJ", result);
         toastSuccess();

         refresh();
       })
       .catch((error) => {
         console.log(error);
         toastError();
       });
    
    onClose();
  }

  /* TOAST ----------------------------------------*/
  const toast = useToast();

  function toastSuccess() {
    toast({
      title: "Success!",
      description: "Your tour or activity has been deleted.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function toastError() {
    toast({
      title: "Error!.",
      description: "We were unable to delete your tour or activity.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  /* BOXES ----------------------------------------*/
  function newTourWindow() {
    return (
      <Box
        w={{base: "80%", lg:"40%", md:"70%", sm: "80%"}}
        h={{base: "100%", lg:"500px", md:"90%", sm: "85%"}}
        marginTop={{ base: "50%", lg: "0", md: "50%", sm: "60%" }}
        bgColor='white'
        boxShadow="md"
        p={{base: 10, lg: 20, md: 20, sm: 10}}
        borderRadius={20}
        alignSelf={"center"}
      >
        <VStack alignItems="flex-start">
          <HStack alignItems="flex-start">
            <VStack alignItems="flex-start">
              <Heading> New tour </Heading>
              <Text>
                People with disabilities are already booking tours and
                activities through our platform. Become a certified partner!
              </Text>
            </VStack>
            <Image src={ImageInfoMSTO} w={["20%", "20%", "30%", "30%"]} />
          </HStack>
          <Text> How to become a Wheel the World Partner? </Text>
          <HStack>
            <Text color="#2F6FE4"> 1 </Text>
            <Text> Access to any mobile device or computer </Text>
          </HStack>
          <HStack>
            <Text color="#2F6FE4"> 2 </Text>
            <Text> Follow the steps on the app </Text>
          </HStack>
          <HStack>
            <Text color="#2F6FE4"> 3 </Text>
            <Text> Our team will take care of the rest </Text>
          </HStack>
        </VStack>
        <HStack justifyContent="center" w="full">
          <Button
            marginTop={["2", "4", "6", "6", "6", "6", "6"]}
            height={["50px", "60px", "40px", "68px"]}
            width={"50%"}
            bg="#2F6FE4"
            color="white"
            onClick={createTour}
          >
            Let's start!{" "}
          </Button>
        </HStack>
      </Box>
    );
  }

  function tourRegisteredWindow() {
    return (
      <Box
        w={{base: "90%", lg:"40%", md:"70%", sm: "80%"}}
        h={{base: "90%", lg:"500px", md:"75%", sm: "85%"}}
        bgColor='white'
        boxShadow="md"
        p={10}
        borderRadius={20}
        alignSelf={"center"}
      >
        <Heading marginBottom={5}> Tour registered </Heading>
        <Stack h='85%' overflowY='auto'>
        {status === "loading" ? (
          <Skeleton w="full" h="85%" p={10} borderRadius="10px" />
        ) : status === "succeeded" ? (
          tours.map((tourInfo: any) => {
            return (
              <VStack alignItems="flex-start" spacing={spacing}>
                <Text>{tourInfo.basicInformation.tourName}</Text>
                <HStack w="full" spacing={6}>
                  <HStack w="full">
                    <Slider
                      defaultValue={30}
                      value={tourInfo.percentage}
                      isReadOnly={true}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                    </Slider>
                    <Text color="#2F6FE4"> {tourInfo.percentage}% </Text>
                  </HStack>
                  <Button
                    onClick={() => goToTour(tourInfo.id)}
                    size={botonContinue}
                    bg="#2F6FE4"
                    color="white"
                    fontSize={fSBContinue}
                  >
                    {" "}
                    Continue{" "}
                  </Button>
                  <IconButton
                    variant="outline"
                    aria-label="eliminar"
                    size={botonContinue}
                    icon={
                      <DeleteIcon
                        w={6}
                        h={6}
                        onClick={() => {
                          setIndex(tours.indexOf(tourInfo));
                          onOpen();
                        }}
                      />
                    }
                  />
                </HStack>

                <Modal
                  isCentered
                  isOpen={isOpen}
                  onClose={onClose}
                  scrollBehavior="inside"
                >
                  <ModalOverlay
                    bg="none"
                    backdropFilter="auto"
                    backdropBlur="2px"
                  />
                  <ModalContent>
                    <ModalHeader fontSize="lg" fontWeight="bold">
                      {" "}
                      Delete stop{" "}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Are you sure? You can't undo this action afterwards.
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button
                        colorScheme="red"
                        onClick={(e: any) => deleteTour(e)}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            );
          })
        ) : (
          // status === "failed"
          <Stack alignItems={"center"}>
            <Text marginBottom={5} color="#3F6FE4">
              Sorry, something went wrong!{" "}
            </Text>
            <Image src={sillaDeRuedas} h="200px" marginTop={"10px"} />
          </Stack>
        )}
        </Stack>
      </Box>
    );
  }

  //const [isLargerThan1280] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1000px)");

  return (
    <ChakraProvider>
      <Flex h="100vh">
      {isLargerThan1280 ? (
        <VStack
        w="full"
        h='full'
        minHeight={'750px'}
        bgImage={`url(${ImgFondo})`}
        bgSize={'cover'}
        backgroundPosition={'center'}
        backdropBlur="2px"
       >
          <TopMenu/>
          <Stack
            alignItems="center"
            justifyContent="center"
            w="full"
            h="full"
            spacing={"7%"}
            direction={["column", "column", "column", "row"]}
          >
            {indexValue != "No doc" ? ( // Sí hay tours registrados
              <ChakraProvider>
                
                  {newTourWindow()}
                  {tourRegisteredWindow()}
              </ChakraProvider>
            ) : (
              newTourWindow()
            )}
          </Stack>
        </VStack>
      ) : (
        <VStack
        w="full"
        h='full'
        background="#F8F9F9"
        bgSize={'cover'}
       >
         
          <TopMenu/>
          <Stack
            alignItems="center"
            justifyContent="center"
            w="full"
            h="full"
            spacing={"7%"}
            direction={["column", "column", "column", "row"]}
           
          >
            {indexValue != "No doc" ? ( // Sí hay tours registrados
              <ChakraProvider>
                
                  {newTourWindow()}
                  {tourRegisteredWindow()}
              </ChakraProvider>
            ) : (
              newTourWindow()
            )}
          </Stack>
        </VStack>
      )}
        </Flex>
    </ChakraProvider>
  );
}
export default MainScreenTO;
