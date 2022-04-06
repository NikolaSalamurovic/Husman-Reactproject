import axios from "axios";
import { useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";

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

  function deleteBooking(bookingID: any) {
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
