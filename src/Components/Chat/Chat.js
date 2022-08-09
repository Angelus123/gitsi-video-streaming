import "./style.css";
import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  AvatarGroup,
  Button,
  Conversation,
  ConversationHeader,
  StarButton,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  ConversationList,
  InputToolbox,
  Loader,
  TypingIndicator,
  StatusList,
  Status,
  Sidebar,
  Search,
  MessageSeparator,
  Action,
  ExpansionPanel,
} from "@chatscope/chat-ui-kit-react";
import socket from "./../../utils/socket"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const TeamChat = () => {

  const navigate =useNavigate() 

  const [messageInputValue, setMessageInputValue] = useState("");
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser"))?.data?.user?.id)
  const [chatMessages,setChatMessage] = useState()
  const [messageList,setMessageList] = useState([])
  const [typing,setTyping] = useState("")
  
  const user = JSON.parse(localStorage.getItem("currentUser")) 
  // console.log("user",user?.data?.user)
  const AvatarIcon ="https://bootdey.com/img/Content/avatar/avatar2.png"
  
   
  const handleSend = async()=>{

    try {
      const response = await axios({
        url:'http://localhost:4000/api/v1/messages',
        method:'POST',
        data:{
          message:messageInputValue,
          sender:JSON.parse(localStorage.getItem("currentUser"))?.data?.user?.id?"me":"Others"
        },
        headers:{
          "Content-Type":"application/json"
        }
      })

      if(response){

        const messageData = {
          author:JSON.parse(localStorage.getItem("currentUser"))?.data?.user?.id?"me":"Others",
          message:messageInputValue,
          time:new Date(Date.now()).getHours()+ ":"+ new Date(Date.now()).getMinutes()
        }
       await socket.emit("chat-message",messageData)
       setMessageList((list)=>[...list,messageData])
      }

    } catch (error) {
      console.log(error)
    }
    setMessageInputValue("")
  }
 
  React.useEffect(()=>{
  const GetAllMessages = async()=>{

    try {
      const response = await axios({
        url:'http://localhost:4000/api/v1/messages',
        method:'GET',
        headers:{
          "Content-Type":"application/json"
        }
      })

      // console.log("messages",response)
      setChatMessage(response?.data)

    } catch (error) {
      console.log(error)
    }
  }

  GetAllMessages()
  
  },[])

 /**
  * Handle video call
  */

  const handleVideoCall = ()=>{
    navigate('/meet')
  }
  
  React.useEffect(()=>{
    socket.on("receive_message",data=>{
       console.log("message",data?.message)
      setMessageList((list)=>[...list,data])
   })
   if(messageInputValue){

    const typeStatus = {
      author:JSON.parse(localStorage.getItem("currentUser"))?.data?.user?.firstName
       
    }
    
    socket.emit("typing",typeStatus)
   }
   socket.on("isTyping",data=>{
    setTyping(data)
   })
  
  },[socket,messageInputValue])
  
  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left">
          <Search placeholder="Seach..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar  src="https://bootdey.com/img/Content/avatar/avatar1.png" name="Lilly" status="available" />
            </Conversation>
            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar src="https://bootdey.com/img/Content/avatar/avatar2.png" name="Joe" status="dnd" />
            </Conversation>
            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar src="https://bootdey.com/img/Content/avatar/avatar3.png" name="Emily" status="available" />
            </Conversation>
            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar src="https://bootdey.com/img/Content/avatar/avatar7.png" name="Kai" status="unavailable" />
            </Conversation>
            <Conversation
              name="Akane"
              lastSenderName="Akane"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar src="https://bootdey.com/img/Content/avatar/avatar8.png" name="Akane" status="eager" />
            </Conversation>
            <Conversation
              name="Eliot"
              lastSenderName="Eliot"
              info="Yes i can do it for you"
            >
              <Avatar src={AvatarIcon} name="Eliot" status="away" />
            </Conversation>
            <Conversation
              name="Zoe"
              lastSenderName="Zoe"
              info="Yes i can do it for you"
              active
            >
              <Avatar  src="https://bootdey.com/img/Content/avatar/avatar8.png" name="Zoe" status="dnd" />
            </Conversation>
            <Conversation
              name="Patrick"
              lastSenderName="Patrick"
              info="Yes i can do it for you"
            >
              <Avatar src={AvatarIcon} name="Patrick" status="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src="https://bootdey.com/img/Content/avatar/avatar8.png" name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VideoCallButton onClick={handleVideoCall}/>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content={`${typing}`} />}
          >
            <MessageSeparator content="Monday ,20 June 2022" />
        {messageList?.map((data)=>(
            <>
          <Message
             key={data.author+"123"}
              model={{
                message:`${data.message}`,
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction:data?.author==="me"?"outgoing":"incoming",
                position:"single",
              }}
              avatarSpacer
            >
            { data?.author==="me"? <Avatar src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" name="Patrick" />: <Avatar src="https://bootdey.com/img/Content/avatar/avatar8.png" name="Zoe" />}
            </Message>
           
              </>
          ))
              }
           
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleSend}
          />
        </ChatContainer>
        {/* <Sidebar postion="right">
          <ExpansionPanel open title="INFO">
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
          </ExpansionPanel>
          <ExpansionPanel open title="LOCALIZATION">
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
          </ExpansionPanel>
          <ExpansionPanel open title="MEDIA">
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
          </ExpansionPanel>
          <ExpansionPanel open title="SURVEY">
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
          </ExpansionPanel>
          <ExpansionPanel open title="OPTIONS">
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
          </ExpansionPanel>
        </Sidebar> */}
      </MainContainer>
    </div>
  );
};

export default TeamChat;
