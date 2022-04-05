import { IBooking } from "../../models/IBooking";

export interface IPrintBooking {
  booking: IBooking;
  deleteBookingAPI(booking: IBooking): void;
}

export function PrintBookingAdmin(props: IPrintBooking) {
  function deleteBooking(booking: IBooking) {
    props.deleteBookingAPI(booking);
  }
  return (
    <>
      <ul>
        <li>Sällskap: {props.booking._id}</li>
        <li>Datum: {props.booking.date}</li>
        <li>Tid: {props.booking.time}</li>
        <li>Antal gäster: {props.booking.numberOfGuests}</li>
        <button
          onClick={() => {
            deleteBooking(props.booking);
          }}
        >
          Ta bort bokning
        </button>
      </ul>
    </>
  );
}
