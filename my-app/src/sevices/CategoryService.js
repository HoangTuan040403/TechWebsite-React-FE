import axios from "axios"
import { axiosJWT } from "./UserService"


export const getAllCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories/get-all`)
    return res.data
}
