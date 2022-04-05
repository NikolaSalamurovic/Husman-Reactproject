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

  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://school-restaurant-api.azurewebsites.net/booking/create",

  //       {
  //         restaurantId: "624ac35fdf8a9fb11c3ea8ba",
  //         date: "2022-04-07",
  //         time: "21:00",
  //         numberOfGuests: 4,
  //         customer: {
  //           name: "Husman",
  //           lastname: "Pontus",
  //           email: "Marcus@somedomain.com",
  //           phone: "070-0000111",
  //         },
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

  useEffect(() => {
    axios
      .get(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

        { headers: { "Content-Type": "application/json" } }
      )

      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <select name="" id="">
      </select>
    </div>
  )
}
