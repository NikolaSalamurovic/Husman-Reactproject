import axios from "axios";
import { IBooking } from "../models/IBooking";

export class BookingService {
  async getBookings() {
    let response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }

  async postBookings() {
    let response = await axios.post<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

      {
        restaurantId: "624ac35fdf8a9fb11c3ea8ba",
        date: "2022-04-07",
        time: "21:00",
        numberOfGuests: 4,
        customer: {
          name: "Husman",
          lastname: "Pontus",
          email: "Marcus@somedomain.com",
          phone: "070-0000111",
        },
      },

      { headers: { "Content-Type": "application/json" } }
    );
    return console.log(response.data);
  }

  async deleteBookings(id: string) {
    let response = await axios.delete<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/delete/" + id,

      { headers: { "Content-Type": "application/json" } }
    );
    return console.log(response.data);
  }
}

/* I COMPONENTEN
  component.tsx
  useEffect(()=>{
      let service = new BookingService()
      service.getBookings().then(booking=> setBooking(booking))
  })*/
