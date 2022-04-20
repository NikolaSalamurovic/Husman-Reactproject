import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { BookingService } from "../../services/BookingService";
import { CustomerService } from "../../services/CustomerService";
import { StyledButton } from "../StyledComponents/StyledButton";
import "./PrintBooking.css";

export interface IPrintBooking {
  booking: IBooking;
  deleteBookingAPI(bookingId: string | undefined): void;
  changeBookingAPI(
    bookingId: string | undefined,
    bookingcustomerId: string | undefined,
    date: string,
    time: string,
    numberofguests: number
  ): void;
}

export interface IChange {
  date: string;
  time: string;
  numberOfGuests: number;
}

export interface IBookingCustomer {
  _id: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export function PrintBookingAdmin(props: IPrintBooking) {
  const [bookingCustomer, setBookingCustomer] =
    useState<IBookingCustomer>() || undefined;
  const [changeObject, setChangeObject] = useState<IChange>({
    date: "",
    time: "",
    numberOfGuests: 0,
  });
  const [valueFromCalendar, setValueFromCalendar] = useState("");
  const [valueFromNumberOfGuests, setValueFromNumberOfGuests] =
    useState<number>(0);
  const [dateBooking, setDateBooking] = useState<string>("");
  const [timeBooking, setTimeBooking] = useState<string>("");
  const [changeInputChange, setChangeInputChange] = useState(false);

  //Booleaner för att visa korrekta tider utefter hur många bord som är bokade/datum
  const [fullTable18, setFullTable18] = useState(false);
  const [fullTable21, setFullTable21] = useState(false);
  const [notFullTable18, setNotFullTable18] = useState(false);
  const [notFullTable21, setNotFullTable21] = useState(false);

  //Booleaner för att submitknapp ändringar ska vara disabled
  const [ableButtonTime, setAbleButtonTime] = useState(false);
  const [ableButtonNumberOfGuests, setAbleButtonNumberOfGuests] =
    useState(false);
  const [ableButtonDate, setAbleButtonDate] = useState(false);

  const [countingTables18, setCountingTables18] = useState(0);
  const [countingTables21, setCountingTables21] = useState(0);
  //Hämtning av bokningar från bokningsservice
  useEffect(() => {
    //TILL SERVICE
    let service = new CustomerService();
    service.getCustomer(props.booking.customerId).then((customer) => {
      setBookingCustomer({
        _id: props.booking._id,
        date: props.booking.date,
        time: props.booking.time,
        numberOfGuests: props.booking.numberOfGuests,
        customerId: props.booking.customerId,
        customer: {
          name: customer[0].lastname,
          email: customer[0].email,
          phone: customer[0].phone,
        },
      });
    });
  }, []);

  useEffect(() => {
    setNotFullTable18(false);
    setNotFullTable21(false);
    setAbleButtonTime(false);
    let counter18: number = 0;
    let counter21: number = 0;
    console.log("jag är här faktiskt!");
    //för att man ska kunna ändra sitt bord till fler utefter hur många man faktiskt
    //vill boka in tar jag bort antal bord som de redan har bokat först.

    if (bookingCustomer!)
      if (bookingCustomer.date === valueFromCalendar) {
        if (
          bookingCustomer.time === "18:00" &&
          bookingCustomer.numberOfGuests > 0 &&
          bookingCustomer.numberOfGuests < 7
        ) {
          counter18 = counter18 - 1;

          console.log("är här i iffen");
        } else if (
          bookingCustomer.time === "18:00" &&
          bookingCustomer.numberOfGuests < 6 &&
          bookingCustomer.numberOfGuests < 13
        ) {
          counter18 = counter18 - 2;

          console.log("är här i iffen");
        } else if (
          bookingCustomer.time === "18:00" &&
          bookingCustomer.numberOfGuests > 12
        ) {
          counter18 = counter18 - 3;
          console.log("är här i iffen");
        } else if (
          bookingCustomer.time === "21:00" &&
          bookingCustomer.numberOfGuests > 0 &&
          bookingCustomer.numberOfGuests < 7
        ) {
          counter21 = counter21 - 1;

          console.log("är här i iffen");
        } else if (
          bookingCustomer.time === "21:00" &&
          bookingCustomer.numberOfGuests < 6 &&
          bookingCustomer.numberOfGuests < 13
        ) {
          counter21 = counter21 - 2;

          console.log("är här i iffen");
        } else if (
          bookingCustomer.time === "21:00" &&
          bookingCustomer.numberOfGuests > 12
        ) {
          counter21 = counter21 - 3;
          console.log("är här i iffen");
        }
      }
    let service = new BookingService();
    service.getBookings().then((response) => {
      console.log(response);
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
      console.log(resultTime21);
      if (resultTime18.length === 0) {
        setFullTable18(false);
        setNotFullTable18(true);
        setDateBooking(valueFromCalendar);
        setCountingTables18(0);
        console.log("hejhejhej");
      } else {
        resultTime18.map((booking) => {
          if (booking.numberOfGuests > 12) {
            counter18 = counter18 + 3;
            if (counter18 >= 15) {
              setFullTable18(true);
              setNotFullTable18(false);
              console.log("hejhej");
            } else {
              setFullTable18(false);
              setNotFullTable18(true);
              setDateBooking(valueFromCalendar);
              console.log("hejhejhej");
            }
          } else if (
            booking.numberOfGuests > 6 &&
            booking.numberOfGuests <= 12
          ) {
            counter18 = counter18 + 2;
            if (counter18 >= 15) {
              setFullTable18(true);
              setNotFullTable18(false);
            } else {
              setFullTable18(false);
              setNotFullTable18(true);
              setDateBooking(valueFromCalendar);
            }
          } else if (booking.numberOfGuests < 0 && booking.numberOfGuests < 7) {
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
        setCountingTables21(0);
        console.log("hejhejhej");
      } else {
        resultTime21.map((booking) => {
          console.log(booking);
          if (booking.numberOfGuests > 12) {
            counter21 = counter21 + 3;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
              console.log("if1215");
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
              console.log("if12");
            }
          } else if (
            booking.numberOfGuests > 6 &&
            booking.numberOfGuests < 13
          ) {
            counter21 = counter21 + 2;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
              console.log("if615");
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
              console.log("if6");
            }
          } else if (booking.numberOfGuests > 0 && booking.numberOfGuests < 7) {
            counter21 = counter21 + 1;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
              console.log("if115");
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
              console.log("if1");
            }
          }
        });
        console.log(counter21);
        setCountingTables21(counter21);
      }
      console.log(counter21);
    });
    console.log(counter21);
  }, [valueFromCalendar]);

  //Vid ändring av antal gäster vid bokning ändras knapparna för tider beroende på
  //om det finns bord
  useEffect(() => {
    let counter18 = countingTables18;
    console.log(counter18);
    if (valueFromNumberOfGuests >= 0 && valueFromNumberOfGuests < 7) {
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
    if (valueFromNumberOfGuests >= 0 && valueFromNumberOfGuests < 7) {
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

  //funktion för att ta bort bokningar
  function deleteBooking(bookingID: string | undefined) {
    props.deleteBookingAPI(bookingID);
  }

  //funktion för att fånga ändring input antalet gäster
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAbleButtonNumberOfGuests(true);
    let name: string = e.target.name;

    setChangeObject({ ...changeObject, [name]: e.target.value });
    setValueFromNumberOfGuests(Number(e.target.value));
  }

  //funktion för att ändra bokning
  function addChange(
    bookingID: string | undefined,
    bookingcustomerID: string | undefined,
    numberofguests: number
  ) {
    props.changeBookingAPI(
      bookingID,
      bookingcustomerID,
      dateBooking,
      timeBooking,
      numberofguests
    );
  }

  //function för att ändra datum i kalender som avstämmer med
  //api att det inte finns fler än 15 bokningar per tidpunkt/kväll
  const changeDateCalendar = (valueFromCalendar: string) => {
    setValueFromCalendar(valueFromCalendar);
  };

  function changeBooking() {
    if (changeInputChange === true) {
      setChangeInputChange(false);
    } else {
      setChangeInputChange(true);
    }
  }

  return (
    <>
      <article className="containerBooking">
        <ul className="bookingList">
          <li className="nameBooking">
            Sällskap: {bookingCustomer?.customer.name}
          </li>
          <li>Datum: {bookingCustomer?.date}</li>
          <li>Tid: Kl:{bookingCustomer?.time}</li>
          <li>Antal gäster: {bookingCustomer?.numberOfGuests}</li>

          <li>Email: {bookingCustomer?.customer.email}</li>
          <li>Telefon: {bookingCustomer?.customer.phone}</li>
          <li>
            <StyledButton
              className="buttonDeleteChange"
              onClick={() => {
                deleteBooking(bookingCustomer?._id);
              }}
            >
              Ta bort bokning
            </StyledButton>
          </li>
        </ul>
        <StyledButton
          className="buttonDeleteChange"
          onClick={() => {
            changeBooking();
          }}
        >
          Ändra bokning
        </StyledButton>

        <ul className={changeInputChange ? "showingChange" : "hiddenChange"}>
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

                <button
                  className="buttonSubmit"
                  disabled={
                    !ableButtonTime ||
                    !ableButtonNumberOfGuests ||
                    !ableButtonDate
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(valueFromCalendar);
                    addChange(
                      bookingCustomer?._id,
                      bookingCustomer?.customerId,
                      changeObject.numberOfGuests
                    );
                  }}
                >
                  Skicka ändring
                </button>
              </form>
            </div>
          </li>
        </ul>
      </article>
    </>
  );
}
