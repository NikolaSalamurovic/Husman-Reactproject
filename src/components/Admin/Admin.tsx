import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { IBookingUpload } from "../../models/IBookingUpload";
import { BookingService } from "../../services/BookingService";
import { StyledButton } from "../StyledComponents/StyledButton";
import { StyledInput } from "../StyledComponents/StyledInput";
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
export interface IChange {
  date: string;
  time: string;
  numberOfGuests: number;
}

export function Admin() {
  const [bookingArray, setBookingArray] = useState<IBooking[]>([]);
  const [deleteBoolean, setDeleteBoolean] = useState(false);
  const [renderBoolean, setRenderBoolean] = useState(false);
  const [printBookings, setPrintBookings] = useState<any>(<></>);
  const [dateBooking, setDateBooking] = useState<string>("");
  const [timeBooking, setTimeBooking] = useState<string>("");
  const [changeInputNew, setChangeInputNew] = useState(false);
  const [fullTable18, setFullTable18] = useState(false);
  const [fullTable21, setFullTable21] = useState(false);
  const [notFullTable18, setNotFullTable18] = useState(false);
  const [notFullTable21, setNotFullTable21] = useState(false);

  //Booleaner för att submitknapp ändringar ska vara disabled
  const [ableButtonTime, setAbleButtonTime] = useState(false);
  const [ableButtonNumberOfGuests, setAbleButtonNumberOfGuests] =
    useState(false);
  const [ableButtonDate, setAbleButtonDate] = useState(false);
  const [ableButtonName, setAbleButtonName] = useState(false);
  const [ableButtonLastName, setAbleButtonLastName] = useState(false);
  const [ableButtonEmail, setAbleButtonEmail] = useState(false);
  const [ableButtonPhone, setAbleButtonPhone] = useState(false);
  const [changeObject, setChangeObject] = useState<any>({
    restaurantId: "624ac35fdf8a9fb11c3ea8ba",
    date: dateBooking,
    time: timeBooking,
    numberOfGuests: 0,
    customer: "",
  });
  const [changeCustomer, setChangeCustomer] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [validationMessageName, setValidationMessageName] = useState("");
  const [validationMessageLastname, setValidationMessageLastname] =
    useState("");
  const [validationMessageEmail, setValidationMessageEmail] = useState("");
  const [validationMessagePhone, setValidationMessagePhone] = useState("");
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

  function newBooking() {
    if (changeInputNew === true) {
      setChangeInputNew(false);
    } else {
      setChangeInputNew(true);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAbleButtonNumberOfGuests(true);
    let name: string = e.target.name;
    console.log(e.target.value);
    setChangeObject({ ...changeObject, [name]: e.target.value });
  }
  function handleChangeCustomer(e: ChangeEvent<HTMLInputElement>) {
    let name: string = e.target.name;
    console.log(e.target.value);
    setChangeCustomer({ ...changeCustomer, [name]: e.target.value });
  }
  const changeDateCalendar = (valueFromCalendar: string) => {
    setNotFullTable18(false);
    setNotFullTable21(false);
    setAbleButtonTime(false);
    let service = new BookingService();
    service.getBookings().then((response) => {
      console.log(response);
      let bookingarray: IBooking[] = response;
      let resultDate = bookingarray.filter(
        (booking) => booking.date === valueFromCalendar
      );

      let resultTime18 = resultDate.filter((dateItem) => {
        return dateItem.time == "18:00";
      });
      let resultTime21 = resultDate.filter((dateItem) => {
        return dateItem.time == "21:00";
      });
      console.log(resultTime18.length);
      if (resultTime18.length >= 15) {
        setFullTable18(true);
      } else {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
      }
      if (resultTime21.length >= 15) {
        setFullTable21(true);
      } else {
        setFullTable21(false);
        setDateBooking(valueFromCalendar);
        setNotFullTable21(true);
      }
      console.log(resultTime18);
      console.log(resultTime21);
      console.log(fullTable18);
      console.log(fullTable21);
    });
  };

  function printNewBooking() {
    console.log(changeCustomer.phone);
    if (changeCustomer.name.length < 2) {
      setValidationMessageName("Minst 2 tecken");
    } else if (changeCustomer.lastname.length < 2) {
      setValidationMessageLastname("Minst 2 tecken");
    } else if (changeCustomer.email.includes("@") === false) {
      setValidationMessageEmail("Måste vara en email");
    } else if (changeCustomer.phone.length < 5) {
      setValidationMessagePhone("Telefonnummer krävs");
    } else {
      let bookingObject: IBookingUpload = {
        restaurantId: "624ac35fdf8a9fb11c3ea8ba",
        date: dateBooking,
        time: timeBooking,
        numberOfGuests: changeObject.numberOfGuests,
        customer: {
          name: changeCustomer.name,
          lastname: changeCustomer.lastname,
          email: changeCustomer.email,
          phone: changeCustomer.phone.toString(),
        },
      };
      console.log(bookingObject);
      let service = new BookingService();
      service.postBookings(bookingObject).then((response) => {
        console.log(response);
        alert("Tack för bokningen, du skickas till startsidan");
        navigation("/");
      });
    }
  }
  return (
    <>
      <div className="containerAdmin">
        <h2 className="headingAdmin">Bokningar</h2>
        <StyledButton
          className="buttonDeleteChange"
          onClick={() => {
            newBooking();
          }}
        >
          Boka ny bokning
        </StyledButton>
        {/* <article className="newBooking"> */}
        <ul className={changeInputNew ? "newBooking showingNew" : "hiddenNew"}>
          <li>
            <div>
              <h2 className="changeBookingHeading">
                Ändra i bokningen nedan:{" "}
              </h2>
              <p className="changeBookingParagraph">(Fyll i samtliga fält)</p>
              <form>
                <input
                  type="date"
                  onChange={(e) => {
                    changeDateCalendar(e.target.value);
                    setAbleButtonDate(true);
                  }}
                />
                {fullTable18 && fullTable21 ? (
                  <>
                    <p>Det finns inga tider</p>
                  </>
                ) : (
                  <></>
                )}

                {notFullTable18 ? (
                  <>
                    <button
                      className="buttonTime"
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeBooking("18:00");
                        setAbleButtonTime(true);
                      }}
                    >
                      18:00
                    </button>
                  </>
                ) : (
                  <></>
                )}
                {notFullTable21 ? (
                  <>
                    <button
                      className="buttonTime"
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeBooking("21:00");
                        setAbleButtonTime(true);
                      }}
                    >
                      21:00
                    </button>
                  </>
                ) : (
                  <></>
                )}
                <div className="containerInputAdmin">
                  <label
                    className="labelNumberOfGuests"
                    htmlFor="numberOfGuests"
                  >
                    {`Antal gäster: `}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    name="numberOfGuests"
                    value={changeObject.numberOfGuests}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={
                    ableButtonTime ? "containerCustomer" : "hiddenCustomer"
                  }
                >
                  <StyledInput
                    type="text"
                    placeholder="Förnamn"
                    className="styledInputAdmin"
                    name="name"
                    value={changeCustomer.name}
                    onChange={handleChangeCustomer}
                    required
                    // onClick={() => {
                    //   setAbleButtonName(true);
                    // }}
                  />
                  <p className="validationMessage">{validationMessageName}</p>
                  <StyledInput
                    type="text"
                    placeholder="Efternamn"
                    name="lastname"
                    className="styledInputAdmin"
                    value={changeCustomer.lastname}
                    onChange={handleChangeCustomer}
                    required
                    // onClick={() => {
                    //   setAbleButtonLastName(true);
                    // }}
                  />
                  <p className="validationMessage">
                    {validationMessageLastname}
                  </p>
                  <StyledInput
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    className="styledInputAdmin"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="please enter valid email [test@test.com]."
                    required
                    value={changeCustomer.email}
                    onChange={handleChangeCustomer}
                    // onClick={() => {
                    //   setAbleButtonEmail(true);
                    // }}
                  />
                  <p className="validationMessage">{validationMessageEmail}</p>
                  <StyledInput
                    type="number"
                    placeholder="Telefon"
                    name="phone"
                    className="styledInputAdmin"
                    value={changeCustomer.phone}
                    onChange={handleChangeCustomer}
                    required
                    // onClick={() => {
                    //   setAbleButtonPhone(true);
                    // }}
                  />
                  <p className="validationMessage">{validationMessagePhone}</p>
                  <button
                    type="submit"
                    className="bookNewButton"
                    disabled={
                      !ableButtonDate ||
                      !ableButtonTime ||
                      !ableButtonNumberOfGuests
                      // !ableButtonName ||
                      // !ableButtonLastName ||
                      // !ableButtonEmail ||
                      // ableButtonPhone
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      printNewBooking();
                    }}
                  >
                    Boka
                  </button>
                </div>
              </form>
            </div>
          </li>
        </ul>
        {/* </article> */}
        <section className="sectionAdmin">{printBookings}</section>
      </div>
    </>
  );
}
