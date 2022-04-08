import { ChangeEvent, useState } from "react";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledInput } from "../StyledComponents/StyledInput";
import "./style.css";

interface INewUserMessage {
  name:string;
  email:string;
  phone:string;
  message:string;
 }

export function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [newUserMessage, setNewUserMessage] = useState<INewUserMessage>({
    name: "",
    email: "",
    phone:"",
    message:""
  });
  
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
   setNewUserMessage({...newUserMessage, [e.target.name]: e.target.value});
  };

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
   setNewUserMessage({...newUserMessage, [e.target.name]: e.target.value})
  };
  
  function sendMessage() {
    if (
       newUserMessage.name === "" ||
       newUserMessage.email === "" ||
       newUserMessage.phone === "" ||
       newUserMessage.message === ""
      ) return
      setIsMessageSent(!isMessageSent)
  };

   function sendNewMessage() {
     setNewUserMessage({
      name: "",
      email: "",
      phone:"",
      message:""
     })
     setIsMessageSent(!isMessageSent)
   };

  return (
    <div className="container">

      {isMessageSent && 
        <div className="sentMessage">
          <p className="bold">Tack för ditt meddelande!<br/>Vi återkopplar så snart som möjligt.</p>
          <p><span className="boldUnderline">Namn:</span> {newUserMessage.name}</p>
          <p><span className="boldUnderline">E-mail:</span> {newUserMessage.email}</p>
          <p><span className="boldUnderline">Telefon:</span> {newUserMessage.phone}</p>
          <p><span className="boldUnderline">Meddelande:</span><br/>{newUserMessage.message}</p>
          <StyledButton className="buttonMargin" onClick={sendNewMessage}>Skicka ett till meddelande</StyledButton>
        </div>}

      {!isMessageSent && 
        <form className="form">

          <div>
            <label>Namn</label>
            {!newUserMessage.name && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput type="text" placeholder="Namn" name="name" value={newUserMessage.name} onChange={handleInputChange}/>

          <div>
            <label>E-mail</label>
            {!newUserMessage.email && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput type="text" placeholder="E-mail" name="email" value={newUserMessage.email} onChange={handleInputChange}/>

          <div>
            <label>Telefon</label>
            {!newUserMessage.phone && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput type="text" placeholder="Telefon" name="phone" value={newUserMessage.phone} onChange={handleInputChange}/>

          <div>
            <label>Meddelande</label>
            {!newUserMessage.message && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <textarea placeholder="Meddelande" name="message" value={newUserMessage.message} onChange={handleTextAreaChange}/>

          <StyledButton onClick={sendMessage}>Skicka meddelande</StyledButton>
        </form>}

      <div className="restaurantInfo">
        <p className="bold">Du hittar oss på:</p>
        <p>Åregatan 1</p>
        <p>123 45</p>
        <p>Åre</p>
      </div>

    </div>
  );
}

