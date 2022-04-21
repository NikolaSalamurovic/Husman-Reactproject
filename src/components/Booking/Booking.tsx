import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IBookingUpload } from "../../models/IBookingUpload";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { useForm, useFormState } from "react-hook-form";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledInput } from "../StyledComponents/StyledInput";
import { BookingService } from "../../services/BookingService";

export function Booking() {
  const [times, setTimes] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingArray, setBookingArray] = useState<IBooking[]>([]);
  const [availableBookings, setAvailableBookings] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState<IBookingUpload>({
    restaurantId: "624ac35fdf8a9fb11c3ea8ba",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const navigate = useNavigate();

  function cancelBooking() {
    setSelectedDate("");
  }

  useEffect(() => {
    let service = new BookingService();
    service.getBookings().then((response) => {
      setBookingArray(response);
    });
  }, []);
  useEffect(() => {
    renderTimeSlots();
    setCustomerInfo({
      restaurantId: "624ac35fdf8a9fb11c3ea8ba",
      date: "",
      time: "",
      numberOfGuests: 0,
      customer: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
      },
    });
  }, [selectedDate]);


  useEffect(() => {
    console.log(customerInfo);
  }, [customerInfo]);

  useEffect(() => {
    if(customerInfo.time === ""){
      resetTime();
    }
  }, [customerInfo.time]);

  function renderTimeSlots() {
    let bookings = bookingArray.filter(
      (booking) => booking.date === selectedDate
    );
    let earlyBooking = bookings.filter((booking) => booking.time === "18:00");
    let lateBooking = bookings.filter((booking) => booking.time === "21:00");
    let earlyTwoTable = bookings.filter((booking) => booking.time === "18:00" && booking.numberOfGuests>=7 && booking.numberOfGuests<13)
    let earlyThreeTable = bookings.filter((booking) => booking.time === "18:00" && booking.numberOfGuests>=13)
    let lateTwoTable = bookings.filter((booking) => booking.time === "21:00" && booking.numberOfGuests>=7 && booking.numberOfGuests<13)
    let lateThreeTable = bookings.filter((booking) => booking.time === "21:00" && booking.numberOfGuests>=13)


    if(earlyTwoTable){
      for(let i = 0; i < earlyTwoTable.length; i++){
        earlyBooking.push(earlyTwoTable[i])
      }
    }
    if(earlyThreeTable){
      for(let i = 0; i < earlyThreeTable.length; i++){
        earlyBooking.push(earlyThreeTable[i]);
        earlyBooking.push(earlyThreeTable[i]);
      }
    }

    if(lateTwoTable){
      for(let i = 0; i < lateTwoTable.length; i++){
        lateBooking.push(lateTwoTable[i])
      }
    }
    if(lateThreeTable){
      for(let i = 0; i < lateThreeTable.length; i++){
        lateBooking.push(lateThreeTable[i]);
        lateBooking.push(lateThreeTable[i]);
      }
    }

    
    
    let tempArray = [];
    for (let i = 0; 15 - earlyBooking.length > i; i++) {
      tempArray.push("18:00");
    }
    for (let i = 0; 15 - lateBooking.length > i; i++) {
      tempArray.push("21:00");
    }
    setAvailableBookings(tempArray);
    console.log(tempArray)
    console.log(bookingArray)

  }

  useEffect(() => {
    if(checkTableCount("18:00") && checkTableCount("21:00")){
      setTimes("Välj tid");  
    }
    else if (checkTableCount("18:00") === false && checkTableCount("21:00") === true ){
      setTimes("Välj tid")
    }
    else if (checkTableCount("18:00") === true && checkTableCount("21:00") === false ){
      setTimes("Välj tid")
    }
      else {
        setTimes("Inga tider");
    }
  },[customerInfo.numberOfGuests])


  
  function uploadBooking() {
    let bookinginfo: IBookingUpload = {
      restaurantId: "624ac35fdf8a9fb11c3ea8ba",
      date: customerInfo.date,
      time: customerInfo.time,
      numberOfGuests: customerInfo.numberOfGuests,
      customer: {
        name: customerInfo.customer.name,
        lastname: customerInfo.customer.lastname,
        email: customerInfo.customer.email,
        phone: customerInfo.customer.phone,
      },
    };
    let service = new BookingService();
    service.postBookings(bookinginfo).then((response) => {
      console.log(response);
      alert(
        "Du har nu bokat ett bord och kommer att skickas vidare till startsidan."
      );
      navigate("/");
    });
  }

  const { register, handleSubmit, control, reset, formState: {errors} } = useForm({
    mode: "onChange"
  });
  const onSubmit = handleSubmit(data => console.log(errors))



 function resetInputs(){
   reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      numberOfGuests: 0, 
      selectedTime: "",
    })
    var select = document.getElementById("selectedTime") as HTMLSelectElement;
    if(select){
      select.value = "0";
    }
    console.log(select)
    
 }

 function resetGuests(){
  reset({
    firstName: '',
    lastName: '',
    email: '',
    phone: '', 
    selectedTime: "",
  })
 }
 function checkedValid(){
  if (buttonDisabled === false){
    setButtonDisabled(true)} 
    else {
      setButtonDisabled(false)
    }
 }


 function resetTime(){
  var select = document.getElementById("selectedTime") as HTMLSelectElement;
  if(select){
    select.value = "0";
  }
 }

 function checkTableCount(timeString:string){
  if(availableBookings.filter((timeslot) => timeslot === timeString).length > 0 && customerInfo.numberOfGuests<7){
    return true;
  } else if (availableBookings.filter((timeslot) => timeslot === timeString).length > 1 && customerInfo.numberOfGuests>6 && customerInfo.numberOfGuests<13){
    return true;
  } else if (availableBookings.filter((timeslot) => timeslot === timeString).length > 2 && customerInfo.numberOfGuests>=13){
    return true;
  } 
  return false;
 }

  return (
    <>
    <div className="bookingContainer">
      <div className="backgroundPicture"></div>
      <h1 className="bookingTitle">Bokning</h1>
      <div className="bookingBorder">
        <form onSubmit={onSubmit}
        >
          <input type="date" className="bookingDate" onClick={resetInputs} onChange={(e) => {setSelectedDate(e.target.value)}} ></input>
          <div>
          {selectedDate.length > 0 && (
                <div className="formGuests">
                  <select
                    {...register("numberOfGuests", {required: true, min: 1,})} name="numberOfGuests" className="guestNumber" onChange={(e) =>
                      {setCustomerInfo({...customerInfo,numberOfGuests: +e.target.value, time:""}); resetGuests(); {setButtonDisabled(false); checkTableCount("18:00"); checkTableCount("21:00")}}
                    }
                  >
                    <option value="0">Antal gäster*</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                  </select>
                </div>)}
            {customerInfo.numberOfGuests > 0 && (
              <div className="timeDiv">
                <select name="" id="selectedTime" onChange={(e) => setCustomerInfo({...customerInfo, time: e.target.value, date: selectedDate})}>
                        {!(customerInfo.time === "18:00" ||customerInfo.time === "21:00") && 
                        <option value={"0"}>{times}</option>}
                  {selectedDate.length > 0 && checkTableCount("18:00") && (
                        <option value={"18:00"}>18:00</option>
                    )}
                  {selectedDate.length > 0 && checkTableCount("21:00") && (
                        <option value={"21:00"}>21:00</option>
                    )}
                </select>
              </div>  
            )}

            {selectedDate.length > 0 && (customerInfo.time=== "18:00" || customerInfo.time === "21:00") && (
              <div>
                <div className="formInput">
                  <StyledInput className="formInputs"
                    type="text" {...register("firstName")} placeholder="Förnamn*" onChange={(e) =>
                      setCustomerInfo({...customerInfo,customer: {...customerInfo.customer,name: e.target.value
                        },
                      })
                    }
                  />
                  <StyledInput className="formInputs"
                    type="text"{...register("lastName", {required: true, min: 4,})} placeholder="Efternamn*"onChange={(e) =>
                      setCustomerInfo({...customerInfo,customer: {...customerInfo.customer,lastname: e.target.value,
                        },
                      })
                    }
                  />
                  <StyledInput className="formInputs"
                    type="tel" {...register("phone", {required: true})} placeholder="Telefon-nummer*"onChange={(e) =>
                      setCustomerInfo({...customerInfo,customer: {...customerInfo.customer,phone: e.target.value,
                        },
                      })
                    }
                  />
                  <StyledInput className="formInputs"
                    type="email" {...register("email", {required: true})} placeholder="Email*" onChange={(e) =>
                      {
                      setCustomerInfo({...customerInfo, customer: {...customerInfo.customer, email: e.target.value,} ,
                      })
                    }
                    }
                  />
                </div>
                <div>
                  <div>
                    <input type="checkbox" className="gdprInput" onClick={checkedValid}/> Genom att klicka i rutan godkänner jag <a href="https://gdprinfo.eu/sv/sv-article-6" target="_blank">villkoren</a> och samtycker härmed att Husman lagrar de personliga uppgifterna skrivna ovan.* 
                  </div>
                    <button type="submit" className="submitBtn" 
                    disabled={!customerInfo.customer.lastname || !customerInfo.customer.name || !customerInfo.customer.email || !customerInfo.customer.phone || !customerInfo.numberOfGuests || !buttonDisabled}
                    onClick={uploadBooking}>
                      Boka
                    </button>
                    <button className="cancelBtn" onClick={() => {
                        reset();
                        cancelBooking();
                      }}
                    >
                      Avbryt
                    </button>
                </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
