import axios from "axios";
import { IBooking } from "../models/IBooking";
import { IBookingUpload } from "../models/IBookingUpload";

export class BookingService {
  async getBookings() {
    let response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ac35fdf8a9fb11c3ea8ba",

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }

  async postBookings(bookinginfo: IBookingUpload) {
    let response = await axios.post<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/create",

      bookinginfo,

      { headers: { "Content-Type": "application/json" } }
    );
    return console.log(response.data);
  }

  async changeBookings(updatedbooking: any, bookingid: any) {
    let response = await axios.put<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/update/" +
        bookingid,

      updatedbooking,

      { headers: { "Content-Type": "application/json" } }
    );
    return response;
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
