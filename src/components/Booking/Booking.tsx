import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";
import { IBookingUpload } from "../../models/IBookingUpload";
import { stringify } from "querystring";




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
      });
  }
  return (
    <>
      <input type="date" onChange={(e) => setSelectedDate(e.target.value)}></input>
      <div>
        
        {selectedDate.length>0 && availableBookings.map((timeslot,i) => {
          return(
            <button key={i} onClick={() => setCustomerInfo({...customerInfo, time:timeslot, date:selectedDate})}>{timeslot}</button>
          )
        })}
        { selectedDate.length>0 && customerInfo.time.length>0 &&
          <>
            <select name="" id="" onChange={(e) => setCustomerInfo({...customerInfo, numberOfGuests:+e.target.value})}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <input type="text" placeholder="name" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, name:e.target.value}})}/>
            <input type="text" placeholder="lastname" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, lastname:e.target.value}})}/>
            <input type="tel" placeholder="phone" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, phone:e.target.value}})}/>
            <input type="text" placeholder="email" onChange={(e) => setCustomerInfo({...customerInfo, customer:{...customerInfo.customer, email:e.target.value}})}/>
          </>
        }
        <button onClick={uploadBooking}>Boka</button>
      </div>
    </>
  )
   

}





  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://school-restaurant-api.azurewebsites.net/customer/create",

  //       {
  //         name: "Husman",
  //         lastname: "Kurt",
  //         email: "someone@somedomain.com",
  //         phone: "070-0000000",
  //       },

  //       { headers: { "Content-Type": "application/json" } }
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .delete(
  //       "https://school-restaurant-api.azurewebsites.net/booking/delete/624c265b8a44bb4d78daed56",

  //       { headers: { "Content-Type": "application/json" } }
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, []);

  //   useEffect(() => {
  //     axios
  //       .put(
  //         "https://school-restaurant-api.azurewebsites.net/customer/update/624c20dd850953b8ad16171e",

  //         {
  //           id: "624c20dd850953b8ad16171e",
  //           name: "Husman",
  //           lastname: "Göran",
  //           email: "someone@somedomain.com",
  //           phone: "070-0000000",
  //         },

  //         { headers: { "Content-Type": "application/json" } }
  //       )

  //       .then((response) => {
  //         console.log(response.data);
  //       });
  //   }, []);
  

