import axios from "axios";
import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";
import { CustomerService } from "../../services/CustomerService";

export interface IPrintBooking {
  booking: IBooking;
  deleteBookingAPI(booking: IBookingCustomer): void;
}

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

export function PrintBookingAdmin(props: IPrintBooking) {
  const [bookingCustomer, setBookingCustomer] =
    useState<IBookingCustomer>() || undefined;

  useEffect(() => {
    //TILL SERVICE
    // let service = new CustomerService();
    // service.getCustomer(props.booking.customerId).then((customer) => {
    //   setBookingCustomer({
    //     _id: props.booking._id,
    //     date: props.booking.date,
    //     time: props.booking.time,
    //     numberOfGuests: props.booking.numberOfGuests,
    //     customer: {
    //       name: customer[0].lastname,
    //       email: customer[0].email,
    //       phone: customer[0].phone,
    //     },
    //   });
    // });
    axios
      .get<ICustomer[]>(
        "https://school-restaurant-api.azurewebsites.net/customer/" +
          props.booking.customerId,

        { headers: { "Content-Type": "application/json" } }
      )

      .then((response) => {
        setBookingCustomer({
          _id: props.booking._id,
          date: props.booking.date,
          time: props.booking.time,
          numberOfGuests: props.booking.numberOfGuests,
          customer: {
            name: response.data[0].lastname,
            email: response.data[0].email,
            phone: response.data[0].phone,
          },
        });
      });
  }, []);
  //BUGG VID DELETE, TAR BORT RÄTT I API MEN FEL I LISTA SOM VISAS
  function deleteBooking(bookingID: any) {
    console.log(bookingID);
    props.deleteBookingAPI(bookingID);
  }
  return (
    <>
      <ul>
        <li>Datum: {bookingCustomer?.date}</li>
        <li>Tid: {bookingCustomer?.time}</li>
        <li>Antal gäster: {bookingCustomer?.numberOfGuests}</li>
        <li>Sällskap: {bookingCustomer?.customer.name}</li>
        <li>Email: {bookingCustomer?.customer.email}</li>
        <li>Telefon: {bookingCustomer?.customer.phone}</li>
        <button
          onClick={() => {
            deleteBooking(bookingCustomer?._id);
          }}
        >
          Ta bort bokning
        </button>
      </ul>
    </>
  );
}

// import { useState } from "react";

// import { IBooking } from "../../models/IBooking";
// import { ICustomer } from "../../models/ICustomer";

// export interface IBookingCustomer {
//   booking: IBooking;
//   customer: [ICustomer];
// }

// export interface IPrintBooking {
//   bookingcustomer: IBookingCustomer;
//   deleteBookingAPI(booking: any): void;
// }
// export interface IPrintBooking {
//   customer: ICustomer[];
//   booking: IBooking;

//   deleteBookingAPI(booking: IBooking): void;
// }
// export function PrintBookingAdmin(props: IPrintBooking) {
//   const [customer1, setCustomer1] = useState<ICustomer[]>();

//   setCustomer1(props.customer);
//   function deleteBooking(booking: IBooking) {
//     props.deleteBookingAPI(booking);
//   }

//   let customerperson = props.customer.map((customeritem, i) => {
//     if (props.booking.customerId === customeritem._id) {
//       return (
//         <li key={i}>
//           <p>Sällskap: {customeritem.lastname}</p>
//           <p>E-mail{customeritem.email}</p>
//         </li>
//       );
//     }
//   });

//   return (
//     <>
//       <ul>
//         <li>Sällskap: {props.booking._id}</li>
//         <li>Datum: {props.booking.date}</li>
//         <li>Tid: {props.booking.time}</li>
//         <li>Antal gäster: {props.booking.numberOfGuests}</li>
//         {/* <li>Sällskap: {customerItem.lastname}</li>
//         <li>Sällskap:{customerItem.email}</li> */}
//         {customerperson}
//         <button
//           onClick={() => {
//             deleteBooking(props.booking);
//           }}
//         >
//           Ta bort bokning
//         </button>
//       </ul>
//     </>
//   );
// function deleteBooking(booking: any) {
//   props.deleteBookingAPI(booking);
// }
// console.log("hej");
// return (
//   <>
//     <ul>
//       <li>Datum: {props.bookingcustomer.booking.date}</li>
//       <li>Tid: {props.bookingcustomer.booking.time}</li>
//       <li>Antal gäster: {props.bookingcustomer.booking.numberOfGuests}</li>
//       <li>Gäst: {props.bookingcustomer.customer[0].lastname}</li>
//       <button
//         onClick={() => {
//           deleteBooking(props.bookingcustomer);
//         }}
//       >
//         Ta bort bokning
//       </button>
//     </ul>
//   </>
// );
// }
