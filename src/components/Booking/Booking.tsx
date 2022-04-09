import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IBookingUpload } from "../../models/IBookingUpload";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { useForm } from "react-hook-form";





export function Booking() {

  

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
   }
 });

 const navigate = useNavigate();

function cancelBooking(){
  setSelectedDate("");
}

 useEffect(() => {
   axios
     .get<IBooking[]>(
       "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

       { headers: { "Content-Type": "application/json" } }
     )

     .then((response) => {
       setBookingArray(response.data);
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
     }})
 }, [selectedDate]);

 if (customerInfo.time === ""){
   customerInfo.time = "Välj tid"
 }


 useEffect(() => {
   console.log(customerInfo);
 }, [customerInfo]);
 
 
 function renderTimeSlots(){
   let bookings = bookingArray.filter((booking) => booking.date === selectedDate)
   let earlyBooking = bookings.filter((booking) => booking.time === "18:00");
   let lateBooking = bookings.filter((booking) => booking.time === "21:00");

   let tempArray = [];
   for (let i = 0; 15-earlyBooking.length>i; i++){
     tempArray.push("18:00");
   }
   for (let i = 0; 15-lateBooking.length>i; i++){
     tempArray.push("21:00");
   }
   setAvailableBookings(tempArray);
   
 }

function uploadBooking(){
 axios
   .post(
     "https://school-restaurant-api.azurewebsites.net/booking/create",

     {
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
     },

     { headers: { "Content-Type": "application/json" } }
   )

   .then((response) => {
     console.log(response.data);
     alert("Du har nu bokat ett bord och kommer att skickas vidare till startsidan.");
     navigate('/');
   });
}

  const {register, handleSubmit, control, reset, formState:{errors}} = useForm() ;

  console.log(errors);
  

  return (
    <>
      <form onSubmit={handleSubmit((data) => {
              console.log(data);
            })}>
        <input type="date" onChange={(e) => setSelectedDate(e.target.value)}></input>
        <div>
        {selectedDate.length>0 && 
          <div className="dropdown" >
            <input type="checkbox" id="dropcheck" className="dropcheck"/>
            <label htmlFor="dropcheck" className="dropbtn" placeholder="Välj tid">{customerInfo.time}</label>
            <div className="dropdown-content">
              {selectedDate.length>0 && availableBookings.filter((timeslot) => timeslot === "18:00").length>0 && 
                  <div>
                      <button  onClick={() => setCustomerInfo({...customerInfo, time:"18:00", date:selectedDate})} >{"18:00"}</button>
                  </div>
              } 
              {selectedDate.length>0 && availableBookings.filter((timeslot) => timeslot === "21:00").length>0 && 
                  <div>
                      <button  onClick={() => setCustomerInfo({...customerInfo, time:"21:00", date:selectedDate})} >{"21:00"}</button>
                  </div>
              } 
            </div>
          </div>}
          
          { selectedDate.length>0 && customerInfo.time.length<8 &&
            <div>
                <select {...register("numberOfGuests", {required:'this is required', min: 1})} name="numberOfGuests" id="" onChange={(e) => setCustomerInfo({...customerInfo, numberOfGuests:+e.target.value})}>
                  <option value="0">Antal gäster</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <input type="text" {...register("firstName", {required: 'this is required'})} placeholder="Förnamn" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, name:e.target.value}})}/>
                <input type="text" {...register("lastName", {required: 'this is required', min: 4})}placeholder="Efternamn" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, lastname:e.target.value}})}/>
                <input type="tel" {...register("phone")} placeholder="Telefon-nummer" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, phone:e.target.value}})}/>
                <input type="text" {...register("email")} placeholder="Email" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, email:e.target.value}})}/>
                <input type="submit" value={"test"} onClick={() => {
                  reset();
                  cancelBooking();
                }}/>
                <input type="submit" value={"Boka"} onClick={uploadBooking} />
                <button onClick={cancelBooking}>Avbryt</button>
            </div>
          }
          
        </div>
      </form>
    </>
  )
   

}


