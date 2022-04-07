import axios from "axios";

import { useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { BookingService } from "../../services/BookingService";

import { PrintBookingAdmin } from "./PrintBookingAdmin";

export interface IBookingCustomer {
  _id: string;
  date: Date;
  time: string;
  numberOfGuests: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export function Admin() {
  const [bookingArray, setBookingArray] = useState<IBooking[]>([]);
  const [deleteBoolean, setDeleteBoolean] = useState(false);
  const [renderBoolean, setRenderBoolean] = useState(false);
  const [printBookings, setPrintBookings] = useState<any>(<></>);
  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://school-restaurant-api.azurewebsites.net/booking/create",

  //       {
  //         restaurantId: "624ac35fdf8a9fb11c3ea8ba",
  //         date: "2022-04-07",
  //         time: "18:00",
  //         numberOfGuests: 4,
  //         customer: {
  //           name: "Husman",
  //           lastname: "Felicia",
  //           email: "Jessica123456@some.com",
  //           phone: "070-0000111",
  //         },
  //       },

  //       { headers: { "Content-Type": "application/json" } }
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, []);

  useEffect(() => {
    //TILL SERVICE
    //   let service = new BookingService();
    //   service.getBookings().then((booking) => {
    //     console.log(booking);
    //     setBookingArray(booking);
    //     if (booleanTest === false) {
    //       setBooleanTest(true);
    //     } else {
    //       setBooleanTest(false);
    //     }
    //   });
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setBookingArray(response.data);
        if (renderBoolean === false) {
          setRenderBoolean(true);
        } else {
          setRenderBoolean(false);
        }
      });
  }, [deleteBoolean]);

  useEffect(() => {
    let bookings = bookingArray?.map((booking) => {
      return (
        <PrintBookingAdmin
          key={booking._id}
          booking={booking}
          deleteBookingAPI={deleteBooking}
        ></PrintBookingAdmin>
      );
    });
    setPrintBookings(bookings);
  }, [renderBoolean]);

  function deleteBooking(bookingid: any) {
    for (let i = 0; i < bookingArray.length; i++) {
      if (bookingid === bookingArray[i]._id) {
        //TILL SERVICE
        // let service = new BookingService();
        // service.deleteBookings(bookingid).then((response)=>{
        //   console.log(response);
        //     setDeleteBoolean(true);
        // })
        axios
          .delete(
            "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
              bookingid,
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            if (deleteBoolean === true) {
              setDeleteBoolean(false);
            } else {
              setDeleteBoolean(true);
            }
          });
      }
    }
  }

  return <>{printBookings}</>;
}
