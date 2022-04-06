import axios from "axios";
import { ICustomer } from "../models/ICustomer";

export class CustomerService {
  async getCustomer(customerid: string) {
    let response = await axios.get<ICustomer[]>(
      "https://school-restaurant-api.azurewebsites.net/customer/" + customerid,

      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  }
}
