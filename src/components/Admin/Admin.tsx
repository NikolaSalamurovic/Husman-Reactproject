import axios from "axios";

import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import { IBooking } from "../../models/IBooking";
import { PrintBookingAdmin } from "./PrintBookingAdmin";

export function Admin() {
  const [bookingArray, setBookingArray] = useState<IBooking[]>([]);
  const [deleteBoolean, setDeleteBoolean] = useState(false);
  let number = 0;
  useEffect(() => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

        { headers: { "Content-Type": "application/json" } }
      )

      .then((response) => {
        console.log(response.data);
        setBookingArray(response.data);
        setDeleteBoolean(false);
      });
  }, [deleteBoolean]);

  let printBookings = bookingArray?.map((booking, i) => {
    return (
      <PrintBookingAdmin
        key={i}
        booking={booking}
        deleteBookingAPI={deleteBooking}
      ></PrintBookingAdmin>
    );
  });

  function deleteBooking(booking: IBooking) {
    for (let i = 0; i < bookingArray.length; i++) {
      if (booking._id === bookingArray[i]._id) {
        console.log(booking._id);
        axios
          .delete(
            "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
              booking._id,
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => {
            console.log(response.data);
            setDeleteBoolean(true);
          });
      }
    }
  }
  return <>{printBookings}</>;
}
