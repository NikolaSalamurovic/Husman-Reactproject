import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { BookingService } from "../../services/BookingService";
import "./Admin.css";
import { PrintBookingAdmin } from "./PrintBookingAdmin";

export interface IBookingCustomer {
  _id: string;
  date: string;
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
  //         date: "2022-03-14",
  //         time: "18:00",
  //         numberOfGuests: 4,
  //         customer: {
  //           name: "Husman",
  //           lastname: "Felicia",
  //           email: "Eriksson1234567812345679624@some.com",
  //           phone: "070-0000111",
  //         },
  //       },

  //       { headers: { "Content-Type": "application/json" } }
  //     )

  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, []);

  //Funktion för att hämta bokningar från service
  useEffect(() => {
    //TILL SERVICE
    let service = new BookingService();
    service.getBookings().then((booking) => {
      console.log(booking);
      setBookingArray(booking);
      if (renderBoolean === false) {
        setRenderBoolean(true);
      } else {
        setRenderBoolean(false);
      }
    });
    // axios
    //   .get<IBooking[]>(
    //     "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     setBookingArray(response.data);

    //     if (renderBoolean === false) {
    //       setRenderBoolean(true);
    //     } else {
    //       setRenderBoolean(false);
    //     }
    //   });
  }, [deleteBoolean]);

  //Funktion för att rendera ut bokningar
  useEffect(() => {
    console.log(bookingArray);
    let bookings = bookingArray?.map((booking) => {
      console.log(booking);
      return (
        <PrintBookingAdmin
          key={booking._id}
          booking={booking}
          deleteBookingAPI={deleteBooking}
          changeBookingAPI={changeBooking}
        ></PrintBookingAdmin>
      );
    });
    setPrintBookings(bookings);
  }, [renderBoolean]);

  //funktion för att ändra bokning genom api-anrop genom service
  const navigation = useNavigate();
  function changeBooking(
    bookingid: string | undefined,
    bookingcustomerid: string,
    date: string,
    bookingtime: string,
    numberofguests: number
  ) {
    console.log(bookingid);
    console.log(bookingcustomerid);
    console.log(date);
    console.log(bookingtime);
    console.log(numberofguests);
    let updatedBooking = {
      id: bookingid,
      restaurantId: "624ac35fdf8a9fb11c3ea8ba",
      date: date,
      time: bookingtime,
      numberOfGuests: Number(numberofguests),
      customerId: bookingcustomerid,
    };
    let service = new BookingService();
    service.changeBookings(updatedBooking, bookingid).then((response) => {
      console.log(response);
      if (response.statusText === "OK") {
        alert("Bokningen har uppdateras, du skickas till startsidan");
        navigation("/");
      } else {
        alert("Oj, något gick fel. Försök igen!");
      }
    });
    // axios
    //   .put<IBooking[]>(
    //     "https://school-restaurant-api.azurewebsites.net/booking/update/" +
    //       bookingid,

    //     {
    //       id: bookingid,
    //       restaurantId: "624ac35fdf8a9fb11c3ea8ba",
    //       date: date,
    //       time: bookingtime,
    //       numberOfGuests: Number(numberofguests),
    //       customerId: bookingcustomerid,
    //     },

    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     console.log(response.statusText);
    //     if (response.statusText === "OK") {
    //       alert("Bokningen har uppdateras, du skickas till startsidan");
    //       navigation("/");
    //     } else {
    //       alert("Oj, något gick fel. Försök igen!");
    //     }
    //   });
  }

  //funktion för att ta bort bokning genom api-anrop till serveice

  function deleteBooking(bookingid: string | undefined) {
    for (let i = 0; i < bookingArray.length; i++) {
      if (bookingid === bookingArray[i]._id) {
        //TILL SERVICE
        let service = new BookingService();
        service.deleteBookings(bookingid).then((response) => {
          if (deleteBoolean === true) {
            setDeleteBoolean(false);
          } else {
            setDeleteBoolean(true);
          }
        });
      }
      //   axios
      //     .delete(
      //       "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
      //         bookingid,
      //       { headers: { "Content-Type": "application/json" } }
      //     )
      //     .then((response) => {
      //       if (deleteBoolean === true) {
      //         setDeleteBoolean(false);
      //       } else {
      //         setDeleteBoolean(true);
      //       }
      //     });
      // }
    }
  }

  return (
    <>
      <div className="containerAdmin">
        <h2 className="headingAdmin">Bokningar</h2>
        <section className="sectionAdmin">{printBookings}</section>
      </div>
    </>
  );
}
