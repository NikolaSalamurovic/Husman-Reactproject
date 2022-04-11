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
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isMessageValid, setIsMessageValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
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

   function sendNewMessage() {
     setNewUserMessage({
      name: "",
      email: "",
      phone:"",
      message:""
     });
     setIsFormValid(true);
     setIsMessageSent(!isMessageSent);
   };

  return (
    <div className="container">

      {isMessageSent && 
        <div className="sentMessage">
          <p className="bold">Tack för ditt meddelande!<br/>Vi återkopplar så snart som möjligt.</p>
          <p><span className="bold">Namn:</span> {newUserMessage.name}</p>
          <p><span className="bold">E-mail:</span> {newUserMessage.email}</p>
          <p><span className="bold">Telefon:</span> {newUserMessage.phone}</p>
          <p><span className="bold">Meddelande:</span><br/>{newUserMessage.message}</p>
          <StyledButton className="buttonMargin" onClick={sendNewMessage}>Skicka ett till meddelande</StyledButton>
        </div>}

      {!isMessageSent && 
        <form 
        className="form" 
        onSubmit={(e) => {
          e.preventDefault();

          if(newUserMessage.name === "") { 
            setIsNameValid(false);
          } else {
            setIsNameValid(true);
          };

          if(newUserMessage.email === "") { 
            setIsEmailValid(false);
          } else {
            setIsEmailValid(true);
          };

          if(newUserMessage.phone === "") { 
            setIsPhoneValid(false);
          } else {
            setIsPhoneValid(true);
          };

          if(newUserMessage.message === "") { 
            setIsMessageValid(false);
          } else {
            setIsMessageValid(true);
          };
          
          if(
            newUserMessage.name === "" ||
            newUserMessage.email === "" ||
            newUserMessage.phone === "" ||
            newUserMessage.message === ""
          ) {
            setIsFormValid(false);
            return
          };

          setIsMessageSent(true)
        }}>

          <div>
            <label>Namn</label>
            {!isNameValid && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput 
            type="text" 
            placeholder="Namn" 
            name="name" 
            value={newUserMessage.name} 
            onChange={handleInputChange}
            maxLength={40}
          />

          <div>
            <label>E-mail</label>
            {!isEmailValid && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput 
            type="email" 
            placeholder="E-mail" 
            name="email" 
            value={newUserMessage.email} 
            onChange={handleInputChange}
            maxLength={60}
          />

          <div>
            <label>Telefon</label>
            {!isPhoneValid && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <StyledInput 
            type="text" 
            placeholder="Telefon" 
            name="phone" 
            value={newUserMessage.phone} 
            onChange={handleInputChange}
            maxLength={12}
          />

          <div>
            <label>Meddelande</label>
            {!isMessageValid && <p className="requiredWarning">*Obligatoriskt fält*</p>}
          </div>
          <textarea 
            placeholder="Meddelande" 
            name="message" 
            value={newUserMessage.message} 
            onChange={handleTextAreaChange}
            maxLength={200}
          />

          <StyledButton>Skicka meddelande</StyledButton>
          {!isFormValid && <p className="requiredWarningForm">*Fyll i obligatoriska fält*</p>}
        </form>}

      <div className="restaurantInfo">
        <p className="bold">Kontaktinformation:</p>
        <p>Åregatan 1</p>
        <p>123 45</p>
        <p>Åre</p>
        <p><span className="bold">Telefon:</span> 123 456 78 90</p>
      </div>

    </div>
  );
}

