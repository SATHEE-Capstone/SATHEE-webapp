// "use client";

// import {
//   Box,
//   Flex,
//   Text,
//   Wrap,
//   WrapItem,
//   Spacer,
//   HStack,
//   VStack,
//   useToast,
//   Spinner,
//   Heading,
//   useDisclosure,
//   Button,
// } from "@chakra-ui/react";
// import { useCallback, useContext, useEffect, useRef, useState } from "react";
// import TopNav from "@/components/TopNav";
// import Checkbox from "@/components/ui/Checkbox";
// import { DangerButton } from "@/components/ui/Button";
// import moment from "moment";
// import useCheckSession from "@/config/checkSession";
// import { UserContext } from "@/store/context/UserContext";
// import {
//   addDoc,
//   collection,
//   doc,
//   onSnapshot,
//   query,
//   where,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "@/config/firebase";
// import { showToastSuccess } from "@/utils/toastUtils";
// import Loading from "../loading";
// import Preferences from "@/components/preferences";
// import Reminder from "@/components/reminder";
// import { getHumeAccessToken } from "@/utils/getHumeAccessToken"; //I added new 1041
// import dynamic from "next/dynamic";

// // Dynamically import Chat component to disable SSR for it
// const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

// export default function Page() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showChat, setShowChat] = useState(false); // State for toggling Chat visibility
//   const [accessToken, setAccessToken] = useState(null); // State for storing the access token

//   const checkSession = useCheckSession();
//   const { state: UserState, setUser } = useContext(UserContext);
//   const toast = useToast();
//   const toastIdRef = useRef(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const {
//     isOpen: isOpenReminder,
//     onOpen: onOpenReminder,
//     onClose: onCloseReminder,
//   } = useDisclosure();

//   // useEffect(() => {
//   //   if (process.env.NODE_ENV === "development") {
//   //     const mockUser = {
//   //       /* mock user data */
//   //     };
//   //     setUser(mockUser);
//   //     setLoading(false);
//   //   } else {
//   //     checkSession().then((val) => {
//   //       if (val.user) {
//   //         setUser(val.user);
//   //         setLoading(false);
//   //       }
//   //     });
//   //   }
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (process.env.NODE_ENV === "development") {
//         const mockUser = {
//           /* mock user data */
//         };
//         setUser(mockUser);
//         setLoading(false);
//       } else {
//         const sessionVal = await checkSession();
//         if (sessionVal.user) {
//           setUser(sessionVal.user);
//           setLoading(false);
//         }
//       }

//       // Fetch access token after user session is loaded
//       const token = await getHumeAccessToken();
//       setAccessToken(token);
//     };

//     fetchData();
//   }, []);

//   async function handleEmergency() {
//     await addDoc(collection(db, "emergency"), {
//       elderlyId: UserState.value.data?.ref,
//       status: "Pending",
//       name: UserState.value.data?.name,
//       number: UserState.value.data?.number,
//     }).then(() => {
//       showToastSuccess(toast, toastIdRef, "Emergency", "Caretaker informed");
//     });
//   }

//   return loading ? (
//     <Loading />
//   ) : (
//     <>
//       <TopNav
//         username={UserState.value.data?.email}
//         role={UserState.value.data?.role}
//         reference={UserState.value.data?.ref}
//         onOpenPreferences={onOpen}
//         onOpenReminder={onOpenReminder}
//       />
//       <Flex flex={1} overflowX="auto" p="32px" flexDir="column" gap={5}>
//         <Box
//           bgGradient="linear(to-r, purple.600, purple.400)"
//           color="white"
//           p={8}
//           borderRadius="lg"
//           boxShadow="md"
//           mb={8}
//         >
//           <Heading>Welcome, {UserState.value.data?.name}</Heading>
//           <Text mt={4} fontSize="lg">
//             Your personal healthcare center
//           </Text>
//         </Box>
//         <Wrap>
//           <WrapItem>
//             <Preferences
//               isOpen={isOpen}
//               onClose={onClose}
//               email={UserState.value.data?.email}
//             />
//           </WrapItem>
//           <Spacer />
//           <WrapItem>
//             <DangerButton
//               onClick={handleEmergency}
//               bgColor="#FF6347"
//               color="white"
//               _hover={{ bg: "#FF4500" }}
//               borderRadius="8px"
//               padding="12px 20px"
//               fontSize="16px"
//             >
//               Emergency
//             </DangerButton>
//           </WrapItem>
//         </Wrap>
//       </Flex>

//       <Reminder
//         isOpenReminder={isOpenReminder}
//         onCloseReminder={onCloseReminder}
//         email={UserState.value.data?.email}
//         userRef={UserState.value.data?.ref}
//       />

//       {/* Button to toggle Chat visibility */}
//       <Box position="fixed" bottom="20px" right="20px">
//         <Button
//           onClick={() => setShowChat(!showChat)}
//           bg="blue.500"
//           color="white"
//           _hover={{ bg: "blue.600" }}
//         >
//           {showChat ? "Close Chat" : "Open Chat"}
//         </Button>
//       </Box>

//       {/* Render Chat component conditionally */}
//       {showChat && accessToken && (
//         <Box
//           position="fixed"
//           bottom="80px"
//           right="20px"
//           width="600px"
//           height="70vh"
//           bg="white"
//           boxShadow="md"
//           borderRadius="lg"
//           zIndex="10"
//           overflowY="auto"
//         >
//           <Chat accessToken={accessToken} />
//         </Box>
//       )}
//     </>
//   );
// }

"use client";

import {
  Box,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Spacer,
  HStack,
  VStack,
  useToast,
  Spinner,
  Heading,
  useDisclosure,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import TopNav from "@/components/TopNav";
import Checkbox from "@/components/ui/Checkbox";
import { DangerButton } from "@/components/ui/Button";
import moment from "moment";
import useCheckSession from "@/config/checkSession";
import { UserContext } from "@/store/context/UserContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { showToastSuccess } from "@/utils/toastUtils";
import Loading from "../loading";
import Preferences from "@/components/preferences";
import Reminder from "@/components/reminder";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import Data from "@/components/chatbot/Animation.json";
import Lottie from "react-lottie-player";
import axios from "axios";
//import { HStack } from "@chakra-ui/react";
import TextChat from "@/components/TextChat";
import Bot from "@/components/chatbot/chatbot";
import ReactMarkdown from "react-markdown";
import EmotionDetection from "@/components/EmotionDetection";

// Dynamically import Chat component to disable SSR for it
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // State for storing the access token

  const checkSession = useCheckSession();
  const { state: UserState, setUser } = useContext(UserContext);
  const toast = useToast();
  const toastIdRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenReminder,
    onOpen: onOpenReminder,
    onClose: onCloseReminder,
  } = useDisclosure();
  const [startChat, setStartChat] = useState(false);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [showTextbox, setShowTextbox] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      if (process.env.NODE_ENV === "development") {
        const mockUser = {
          /* mock user data */
        };
        setUser(mockUser);
        setLoading(false);
      } else {
        const sessionVal = await checkSession();
        if (sessionVal.user) {
          setUser(sessionVal.user);
          setLoading(false);
        }
      }

      // Fetch access token after user session is loaded
      const token = await getHumeAccessToken();
      setAccessToken(token);
    };

    fetchData();
  }, []);

  async function handleEmergency() {
    await addDoc(collection(db, "emergency"), {
      elderlyId: UserState.value.data?.ref,
      status: "Pending",
      name: UserState.value.data?.name,
      number: UserState.value.data?.number,
    }).then(() => {
      showToastSuccess(toast, toastIdRef, "Emergency", "Caretaker informed");
    });
  }

  async function handleSendQuery(text) {
    axios
      .post("/api/groq", {
        content: text,
      })
      .then((response) => {
        setMessages((prevMessages) => {
          const newState = [...prevMessages];
          newState.pop();
          newState.push({
            by: "ai",
            msg: response.data.content,
          });
          return newState;
        });
        // console.log(response.data);
      });
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      <TopNav
        username={UserState.value.data?.email}
        role={UserState.value.data?.role}
        reference={UserState.value.data?.ref}
        onOpenPreferences={onOpen}
        onOpenReminder={onOpenReminder}
      />
      <Flex flex={1} overflowX="auto" p="32px" flexDir="column" gap={5}>
        <Box
          bgGradient="linear(to-r, purple.600, purple.400)"
          color="white"
          p={8}
          borderRadius="lg"
          boxShadow="md"
          mb={8}
        >
          <Heading>Welcome, {UserState.value.data?.name}</Heading>
          <Text mt={4} fontSize="lg">
            Your personal healthcare center
          </Text>
        </Box>
        <Wrap>
          <WrapItem>
            <Preferences
              isOpen={isOpen}
              onClose={onClose}
              email={UserState.value.data?.email}
            />
          </WrapItem>
          <Spacer />
          <WrapItem>
            <DangerButton
              onClick={handleEmergency}
              bgColor="#FF6347"
              color="white"
              _hover={{ bg: "#FF4500" }}
              borderRadius="8px"
              padding="12px 20px"
              fontSize="16px"
            >
              Emergency
            </DangerButton>
          </WrapItem>
        </Wrap>

        {/* Render Chat component on the page */}
        {accessToken && (
          <HStack mt={8} gap={10}>
            <Box>
              <Chat accessToken={accessToken} />
            </Box>
            <Box>
              <Button
                pos={"fixed"}
                bottom={5}
                right={100}
                onClick={() => {
                  setShowTextbox(true);
                  setStartChat(true);
                }}
              >
                {" "}
                StartChat
              </Button>
            </Box>
          </HStack>
        )}
      </Flex>
      {startChat && (
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
          maxW={"800px"}
        >
          <div className="chatbot-body" ref={chatContainerRef}>
            {messages.map((message, index) =>
              message.by == "ai" ? (
                message.msg == "loading" ? (
                  <Lottie
                    key={index}
                    loop
                    animationData={Data}
                    play
                    style={{ width: "100px" }}
                  />
                ) : (
                  <div
                    key={index}
                    className={`message-container-${message.by}`}
                  >
                    <div className="ai-div-container">
                      <Image
                        className="ai-img"
                        src={"/chatbot/aiiq_icon.png"}
                      />
                    </div>
                    <div className="message-ai">
                      <div className="markdown">
                        <ReactMarkdown>{message.msg}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div key={index} className={`message-container-${message.by}`}>
                  <div className="message-user">{message.msg}</div>
                  <div className="user-div-container">
                    <Image className="user-img" src={"/chatbot/user.svg"} />
                  </div>
                </div>
              )
            )}
          </div>
          <Flex
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={10}
            gap={10}
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              width={"300px"}
            />
            <Button
              onClick={() => {
                const text = query;
                setQuery("");
                setMessages((prevMessages) => {
                  const newState = [...prevMessages];
                  newState.push({
                    by: "user",
                    msg: text,
                  });
                  newState.push({
                    by: "ai",
                    msg: "loading",
                  });
                  return newState;
                });
                handleSendQuery(text);
              }}
            >
              Send
            </Button>
            <DangerButton
              onClick={() => {
                setStartChat(false);
                setMessages([]);
              }}
            >
              End Chat
            </DangerButton>
          </Flex>
        </Box>
      )}
      <Reminder
        isOpenReminder={isOpenReminder}
        onCloseReminder={onCloseReminder}
        email={UserState.value.data?.email}
        userRef={UserState.value.data?.ref}
      />
      <EmotionDetection />
    </>
  );
}
