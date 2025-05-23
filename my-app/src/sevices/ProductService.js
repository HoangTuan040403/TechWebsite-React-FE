import axios from "axios"
import { axiosJWT } from "./UserService"


export const findProduct = async (search) => {
  let res = {}
  if (search.length > 0) {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}`)
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  }

  return res.data
}

export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`);
    return res.data;
  }
};




export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  return res.data
}


export const getAllNewArrivals = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-allarrivals?limit=6`);
  return res.data;
};



export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
  return res.data
}

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
  return res.data
}

export const updateProduct = async ({ id, data, token }) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
    headers: {
      token: `Bearer ${token}`,
    }
  });
  return res.data;
};

export const deleteProduct = async ({ id, access_token }) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });
  return res.data;
};

export const deleteManyProduct = async ({ data, access_token }) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
      data, // Dữ liệu truyền qua đây
    }
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`

  );
  return res.data;
};


