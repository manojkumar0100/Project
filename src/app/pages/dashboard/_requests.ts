import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;
export const REQUEST_CLINICS = `${API_URL}/api/clinic/create/`

export async function getclinics() {
    console.log("IN CLINIC FUNCTIon");
    const response = await axios.get(REQUEST_CLINICS);
      console.log("AFTER");
      console.log(response);
      console.log("AFTER 2");
      return response;
  }