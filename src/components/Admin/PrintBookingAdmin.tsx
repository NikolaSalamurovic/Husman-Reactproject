import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { ICustomer } from "../../models/ICustomer";
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
  // const [changeInput, setChangeInput] = useState(<></>);
  const [changeObject, setChangeObject] = useState<IChange>({
    date: "",
    time: "",
    numberOfGuests: 0,
  });
  const [valueFromCalendar, setValueFromCalendar] = useState("");
  const [fullTable18, setFullTable18] = useState(false);
  const [fullTable21, setFullTable21] = useState(false);
  const [dateBooking, setDateBooking] = useState<string>("");
  const [timeBooking, setTimeBooking] = useState<string>("");
  const [ableButton, setAbleButton] = useState(false);
  const [ableButton2, setAbleButton2] = useState(false);
  const [ableButton3, setAbleButton3] = useState(false);

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
          customerId: props.booking.customerId,
          customer: {
            name: response.data[0].lastname,
            email: response.data[0].email,
            phone: response.data[0].phone,
          },
        });
      });
  }, []);

  function deleteBooking(bookingID: string | undefined) {
    props.deleteBookingAPI(bookingID);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setAbleButton2(true);
    let name: string = e.target.name;

    setChangeObject({ ...changeObject, [name]: e.target.value });
  }
  // function changeBooking(bookingID: string | undefined) {
  //   setChangeInput(<></>);
  // }

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
  const changeDateCalendar = (valueFromCalendar: string) => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
        let bookingarray: IBooking[] = response.data;
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
        if (resultTime18.length >= 2) {
          setFullTable18(true);
        } else {
          setFullTable18(false);
          setDateBooking(valueFromCalendar);
          setAbleButton(true);
        }
        if (resultTime21.length >= 2) {
          setFullTable21(true);
        } else {
          setFullTable21(false);
          setDateBooking(valueFromCalendar);
          setAbleButton(true);
        }
        console.log(resultTime18);
        console.log(resultTime21);
        console.log(fullTable18);
        console.log(fullTable21);
      });
  };
  return (
    <>
      <article className="containerBooking">
        <ul>
          <li className="nameBooking">
            Sällskap: {bookingCustomer?.customer.name}
          </li>
          <li>Datum: {bookingCustomer?.date}</li>
          <li>Tid: {bookingCustomer?.time}</li>
          <li>Antal gäster: {bookingCustomer?.numberOfGuests}</li>

          <li>Email: {bookingCustomer?.customer.email}</li>
          <li>Telefon: {bookingCustomer?.customer.phone}</li>
          <button
            onClick={() => {
              deleteBooking(bookingCustomer?._id);
            }}
          >
            Ta bort bokning
          </button>
          <div>
            <p>Ändra i bokningen nedan: (Fyll i samtliga fält)</p>
            <form>
              <input
                type="date"
                onChange={(e) => {
                  changeDateCalendar(e.target.value);
                  setAbleButton3(true);
                }}
              />
              {fullTable18 && fullTable21 ? (
                <>
                  <p>Det finns inga tider</p>
                </>
              ) : (
                <>
                  <button
                    className="buttonTime"
                    onClick={(e) => {
                      e.preventDefault();
                      setTimeBooking("18:00");
                    }}
                  >
                    18:00
                  </button>
                  <button
                    className="buttonTime"
                    onClick={(e) => {
                      e.preventDefault();
                      setTimeBooking("21:00");
                    }}
                  >
                    21:00
                  </button>
                </>
              )}

              <label htmlFor="numberOfGuests">Antal gäster:</label>
              <input
                type="number"
                min="1"
                max="6"
                name="numberOfGuests"
                value={changeObject.numberOfGuests}
                onChange={handleChange}
              />

              <button
                disabled={!ableButton || !ableButton2 || !ableButton3}
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
          {/* <button
          onClick={() => {
            changeBooking(bookingCustomer?._id);
          }}
        >
          Ändra bokning
        </button>
        {changeInput} */}
        </ul>
      </article>
    </>
  );
}
