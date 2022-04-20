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
  const [valueFromCalendar, setValueFromCalendar] = useState("");
  const [valueFromNumberOfGuests, setValueFromNumberOfGuests] =
    useState<number>(0);
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

  const [countingTables18, setCountingTables18] = useState(0);
  const [countingTables21, setCountingTables21] = useState(0);

  const [minDateCalendar, setMinDateCalendar] = useState("");
  const [buttonPushed18, setButtonPushed18] = useState(false);
  const [buttonPushed21, setButtonPushed21] = useState(false);

  //Funktion för att hämta bokningar från service
  useEffect(() => {
    if (new Date().getMonth() < 10 && new Date().getDate() < 10) {
      setMinDateCalendar(
        new Date().getFullYear() +
          "-" +
          0 +
          (Number(new Date().getMonth()) + 1) +
          "-" +
          Number(new Date().getDate()) +
          1
      );
    } else if (new Date().getMonth() < 10) {
      setMinDateCalendar(
        new Date().getFullYear() +
          "-" +
          0 +
          (Number(new Date().getMonth()) + 1) +
          "-" +
          new Date().getDate()
      );
    } else if (new Date().getDate() < 10) {
      setMinDateCalendar(
        new Date().getFullYear() +
          "-" +
          new Date().getMonth() +
          "-" +
          (Number(new Date().getDate()) + 1)
      );
    }
    console.log(minDateCalendar);
    //TILL SERVICE
    let service = new BookingService();
    service.getBookings().then((booking) => {
      setBookingArray(booking);
      if (renderBoolean === false) {
        setRenderBoolean(true);
      } else {
        setRenderBoolean(false);
      }
    });
  }, [deleteBoolean]);

  //Funktion för att rendera ut bokningar
  useEffect(() => {
    let bookings = bookingArray?.map((booking) => {
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
  }
  //hämtar bokningar från api och dela upp i lister baserat på tidpunkt kl 18 eller kl 21
  //skapar variabel för bord baserat på att det kan sitta mellan 1-6 personer vid varje bord
  //om antal bord blir fler än 15 visas inte tidknappar och bord kan inte bokas
  useEffect(() => {
    setNotFullTable18(false);
    setNotFullTable21(false);
    setAbleButtonTime(false);

    let service = new BookingService();
    service.getBookings().then((response) => {
      let counter18: number = 0;
      let counter21: number = 0;
      let bookingArray = response;
      let resultDate = bookingArray.filter(
        (booking) => booking.date === valueFromCalendar
      );
      let resultTime18 = resultDate.filter((bookingtime) => {
        return bookingtime.time === "18:00";
      });
      let resultTime21 = resultDate.filter((bookingtime) => {
        return bookingtime.time === "21:00";
      });
      if (resultTime18.length === 0) {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
      } else {
        resultTime18.map((booking) => {
          if (booking.numberOfGuests > 12) {
            counter18 = counter18 + 3;

            if (counter18 >= 15) {
              setFullTable18(true);
              setNotFullTable18(false);
            } else {
              setFullTable18(false);
              setNotFullTable18(true);
              setDateBooking(valueFromCalendar);
            }
          } else if (
            booking.numberOfGuests > 6 &&
            booking.numberOfGuests <= 12
          ) {
            counter18 = counter18 + 2;
            if (counter18 >= 15 || counter18 === 15) {
              setFullTable18(true);
              setNotFullTable18(false);
            } else {
              setFullTable18(false);
              setNotFullTable18(true);
              setDateBooking(valueFromCalendar);
            }
          } else if (booking.numberOfGuests < 7) {
            counter18 = counter18 + 1;
            if (counter18 >= 15) {
              setFullTable18(true);
              setNotFullTable18(false);
            } else {
              setFullTable18(false);
              setNotFullTable18(true);
              setDateBooking(valueFromCalendar);
            }
          }
        });
        console.log(counter18);
        setCountingTables18(counter18);
      }
      if (resultTime21.length === 0) {
        setFullTable21(false);
        setNotFullTable21(true);
        setDateBooking(valueFromCalendar);
      } else {
        resultTime21.map((booking) => {
          if (booking.numberOfGuests > 12) {
            counter21 = counter21 + 3;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
            }
          } else if (
            booking.numberOfGuests > 6 &&
            booking.numberOfGuests < 13
          ) {
            counter21 = counter21 + 2;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
            }
          } else if (booking.numberOfGuests > 0 && booking.numberOfGuests < 7) {
            counter21 = counter21 + 1;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
            }
          }
        });
        console.log(counter21);
        setCountingTables21(counter21);
      }
    });
  }, [valueFromCalendar]);

  //Vid ändring av antal gäster vid bokning ändras knapparna för tider beroende på
  //om det finns bord
  useEffect(() => {
    let counter18 = countingTables18;
    if (valueFromNumberOfGuests > 0 && valueFromNumberOfGuests < 7) {
      counter18 = counter18 + 1;
      if (counter18 > 15) {
        setFullTable18(true);
        setNotFullTable18(false);
      } else {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
      }
    } else if (valueFromNumberOfGuests > 6 && valueFromNumberOfGuests < 13) {
      counter18 = counter18 + 2;
      if (counter18 > 15) {
        setFullTable18(true);
        setNotFullTable18(false);
      } else {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
      }
    } else if (valueFromNumberOfGuests > 12) {
      counter18 = counter18 + 3;
      if (counter18 > 15) {
        setFullTable18(true);
        setNotFullTable18(false);
      } else {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
      }
    }
  }, [countingTables18, valueFromNumberOfGuests]);

  useEffect(() => {
    let counter21 = countingTables21;
    if (valueFromNumberOfGuests > 0 && valueFromNumberOfGuests < 7) {
      counter21 = counter21 + 1;
      if (counter21 > 15) {
        setFullTable21(true);
        setNotFullTable21(false);
      } else {
        setFullTable21(false);
        setNotFullTable21(true);
      }
    } else if (valueFromNumberOfGuests > 6 && valueFromNumberOfGuests < 13) {
      counter21 = counter21 + 2;
      if (counter21 > 15) {
        setFullTable21(true);
        setNotFullTable21(false);
      } else {
        setFullTable21(false);
        setNotFullTable21(true);
        setDateBooking(valueFromCalendar);
      }
    } else if (valueFromNumberOfGuests > 12) {
      counter21 = counter21 + 3;
      if (counter21 > 15) {
        setFullTable21(true);
        setNotFullTable21(false);
      } else {
        setFullTable21(false);
        setNotFullTable21(true);
        setDateBooking(valueFromCalendar);
      }
    }
  }, [countingTables21, valueFromNumberOfGuests]);

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
    }
    setChangeInputNew(false);
  }

  //toggle för ny bokning-knapp
  function newBooking() {
    if (changeInputNew === true) {
      setChangeInputNew(false);
    } else {
      setChangeInputNew(true);
    }
  }
  //input för antal gäster
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAbleButtonNumberOfGuests(true);
    let name: string = e.target.name;
    console.log(e.target.value);
    setChangeObject({ ...changeObject, [name]: e.target.value });
    setValueFromNumberOfGuests(Number(e.target.value));
  }

  //input för kund-info
  function handleChangeCustomer(e: ChangeEvent<HTMLInputElement>) {
    let name: string = e.target.name;
    console.log(e.target.value);
    setChangeCustomer({ ...changeCustomer, [name]: e.target.value });
  }

  //ändring av datum i kalendern
  const changeDateCalendar = (valueFromCalendar: string) => {
    setValueFromCalendar(valueFromCalendar);
  };
  //validering för kund-info
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
        numberOfGuests: Number(changeObject.numberOfGuests),
        customer: {
          name: changeCustomer.name,
          lastname: changeCustomer.lastname,
          email: changeCustomer.email,
          phone: changeCustomer.phone.toString(),
        },
      };

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
                  min={minDateCalendar}
                  onChange={(e) => {
                    changeDateCalendar(e.target.value);
                    setAbleButtonDate(true);
                  }}
                />
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
                    max="18"
                    name="numberOfGuests"
                    value={changeObject.numberOfGuests}
                    onChange={handleChange}
                  />
                </div>
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
                      className={
                        buttonPushed18 ? "buttonPushedTime" : "buttonTime"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeBooking("18:00");
                        setAbleButtonTime(true);
                        setButtonPushed18(true);
                        setButtonPushed21(false);
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
                      className={
                        buttonPushed21 ? "buttonPushedTime" : "buttonTime"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeBooking("21:00");
                        setAbleButtonTime(true);
                        setButtonPushed18(false);
                        setButtonPushed21(true);
                      }}
                    >
                      21:00
                    </button>
                  </>
                ) : (
                  <></>
                )}

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
