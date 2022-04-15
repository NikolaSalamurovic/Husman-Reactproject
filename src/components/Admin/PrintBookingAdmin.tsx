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
    // axios
    //   .get<ICustomer[]>(
    //     "https://school-restaurant-api.azurewebsites.net/customer/" +
    //       props.booking.customerId,

    //     { headers: { "Content-Type": "application/json" } }
    //   )

    //   .then((response) => {
    //     setBookingCustomer({
    //       _id: props.booking._id,
    //       date: props.booking.date,
    //       time: props.booking.time,
    //       numberOfGuests: props.booking.numberOfGuests,
    //       customerId: props.booking.customerId,
    //       customer: {
    //         name: response.data[0].lastname,
    //         email: response.data[0].email,
    //         phone: response.data[0].phone,
    //       },
    //     });
    //   });
  }, []);

  useEffect(() => {
    setNotFullTable18(false);
    setNotFullTable21(false);
    setAbleButtonTime(false);
    let service = new BookingService();
    service.getBookings().then((response) => {
      //för att man ska kunna ändra sitt bord till fler utefter hur många man faktiskt
      //vill boka in tar jag bort antal bord som de redan har bokat först.
      let counter18: number = 0;
      let counter21: number = 0;
      if (props.booking.numberOfGuests <= 6) {
        counter18 = -2;
        counter21 = -2;
      } else if (
        props.booking.numberOfGuests < 6 &&
        props.booking.numberOfGuests <= 12
      ) {
        counter18 = -3;
        counter21 = -3;
      } else if (props.booking.numberOfGuests > 12) {
        counter18 = -4;
        counter21 = -4;
      }
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
        console.log("hejhejhej");
      } else {
        resultTime18.map((booking) => {
          if (booking.numberOfGuests > 12 || valueFromNumberOfGuests > 12) {
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
            (booking.numberOfGuests > 6 && booking.numberOfGuests <= 12) ||
            (valueFromNumberOfGuests > 6 && valueFromNumberOfGuests <= 12)
          ) {
            counter18 = counter18 + 2;
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
            booking.numberOfGuests <= 6 ||
            valueFromNumberOfGuests <= 6
          ) {
            counter18 = counter18 + 1;
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
          }
        });
        console.log(counter18);
      }
      if (resultTime21.length === 0) {
        setFullTable21(false);
        setNotFullTable21(true);
        setDateBooking(valueFromCalendar);
        console.log("hejhejhej");
      } else {
        resultTime21.map((booking) => {
          if (booking.numberOfGuests > 12 || valueFromNumberOfGuests > 12) {
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
            (booking.numberOfGuests > 6 && booking.numberOfGuests < 12) ||
            (valueFromNumberOfGuests > 6 && valueFromNumberOfGuests <= 12)
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
          } else if (
            booking.numberOfGuests <= 6 ||
            valueFromNumberOfGuests <= 6
          ) {
            counter21 = counter21 + 1;
            if (counter21 >= 15) {
              setFullTable21(true);
              setNotFullTable21(false);
              console.log("hejhej");
            } else {
              setFullTable21(false);
              setNotFullTable21(true);
              setDateBooking(valueFromCalendar);
              console.log("hejhejhej");
            }
          }
        });
        console.log(counter21);
      }
    });
  }, [valueFromCalendar, valueFromNumberOfGuests]);
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

    // setNotFullTable18(false);
    // setNotFullTable21(false);
    // setAbleButtonTime(false);
    // let service = new BookingService();
    // service.getBookings().then((response) => {
    //   console.log(response);
    //   let bookingarray: IBooking[] = response;
    //   let resultDate = bookingarray.filter(
    //     (booking) => booking.date === valueFromCalendar
    //   );

    //   let resultTime18 = resultDate.filter((dateItem) => {
    //     return dateItem.time == "18:00";
    //   });
    //   let resultTime21 = resultDate.filter((dateItem) => {
    //     return dateItem.time == "21:00";
    //   });
    //   console.log(resultTime18.length);
    //   if (resultTime18.length >= 15) {
    //     setFullTable18(true);
    //   } else {
    //     setFullTable18(false);
    //     setNotFullTable18(true);
    //     setDateBooking(valueFromCalendar);
    //   }
    //   if (resultTime21.length >= 15) {
    //     setFullTable21(true);
    //   } else {
    //     setFullTable21(false);
    //     setDateBooking(valueFromCalendar);
    //     setNotFullTable21(true);
    //   }
    //   console.log(resultTime18);
    //   console.log(resultTime21);
    //   console.log(fullTable18);
    //   console.log(fullTable21);
    // });

    // axios
    //   .get<IBooking[]>(
    //     "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     let bookingarray: IBooking[] = response.data;
    //     let resultDate = bookingarray.filter(
    //       (booking) => booking.date === valueFromCalendar
    //     );

    //     let resultTime18 = resultDate.filter((dateItem) => {
    //       return dateItem.time == "18:00";
    //     });
    //     let resultTime21 = resultDate.filter((dateItem) => {
    //       return dateItem.time == "21:00";
    //     });
    //     console.log(resultTime18.length);
    //     if (resultTime18.length >= 15) {
    //       setFullTable18(true);
    //     } else {
    //       setFullTable18(false);
    //       setDateBooking(valueFromCalendar);
    //       setAbleButton(true);
    //     }
    //     if (resultTime21.length >= 15) {
    //       setFullTable21(true);
    //     } else {
    //       setFullTable21(false);
    //       setDateBooking(valueFromCalendar);
    //       setAbleButton(true);
    //     }
    //     console.log(resultTime18);
    //     console.log(resultTime21);
    //     console.log(fullTable18);
    //     console.log(fullTable21);
    //   });
  };

  function changeBooking(bookingID: string | undefined) {
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
            changeBooking(bookingCustomer?._id);
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
                    max="18"
                    name="numberOfGuests"
                    value={changeObject.numberOfGuests}
                    onChange={handleChange}
                  />
                </div>

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
