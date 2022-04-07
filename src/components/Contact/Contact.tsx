import { ChangeEvent, useState } from "react";
import "./style.css";

interface INewUserMessage {
  name:string;
  email:string;
  phone:string;
  message:string;
 }

export function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [newUserMessage, setNewUserMessage] = useState<INewUserMessage>({
    name: "",
    email: "",
    phone:"",
    message:""
   })
  
   function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewUserMessage({...newUserMessage, [e.target.name]: e.target.value})
   }

   function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNewUserMessage({...newUserMessage, [e.target.name]: e.target.value})
   }

   function sendMessage() {
     if (
       newUserMessage.name === "" ||
       newUserMessage.email === "" ||
       newUserMessage.phone === "" ||
       newUserMessage.message === ""
     ) return
     setIsMessageSent(!isMessageSent)
   }

   function sendNewMessage() {
     setNewUserMessage({
      name: "",
      email: "",
      phone:"",
      message:""
     })
     setIsMessageSent(!isMessageSent)
   }

  return (
    <div className="container">

      {isMessageSent && 
        <div className="sentMessage">
          <p>Tack för ditt meddelande! Vi återkopplar så snart som möjligt</p>
          <p>Namn: {newUserMessage.name}</p>
          <p>E-mail: {newUserMessage.email}</p>
          <p>Telefon: {newUserMessage.phone}</p>
          <p>Meddelande:<br/>{newUserMessage.message}</p>
          <button onClick={sendNewMessage}>Skicka ett till meddelande</button>
        </div>}

      {!isMessageSent && 
        <form className="form">
          <p className="requiredWarning">*Obligatoriskt fält*</p>
          <input type="text" placeholder="Namn" name="name" value={newUserMessage.name} onChange={handleInputChange}/>
          <input type="text" placeholder="E-mail" name="email" value={newUserMessage.email} onChange={handleInputChange}/>
          <input type="text" placeholder="Telefon" name="phone" value={newUserMessage.phone} onChange={handleInputChange}/>
          <textarea className="messageBox"  placeholder="Meddelande" name="message" value={newUserMessage.message} onChange={handleTextAreaChange}/>
          <button onClick={sendMessage}>Skicka meddelande</button>
        </form>}

      <div className="restaurantinfo">
        <p>Husman</p>
        <p>Åregatan 1</p>
        <p>123 45</p>
        <p>Åre</p>
      </div>

    </div>
  );
}

