import axios from "axios";
import { useEffect } from "react";

export function Booking() {
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

  //   useEffect(() => {
  //     axios
  //       .post(
  //         "https://school-restaurant-api.azurewebsites.net/booking/create",

  //         {
  //           restaurantId: "624ac35fdf8a9fb11c3ea8ba",
  //           date: new Date(),
  //           time: "21:00",
  //           numberOfGuests: 4,
  //           customer: {},
  //         },

  //         { headers: { "Content-Type": "application/json" } }
  //       )

  //       .then((response) => {
  //         console.log(response.data);
  //       });
  //   }, []);

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

  return <>Booking works.</>;
}
