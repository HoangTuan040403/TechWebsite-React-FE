import axios from "axios"

export const axiosJWT = axios.create()

// export const loginUser = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
//     return res.data
// }

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
        return res.data; // Giả sử API trả về { success: true | false, message: "..." }
    } catch (error) {
        throw error.response.data; // Ném lỗi để xử lý ở nơi gọi hàm này
    }
}


export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data
}


export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}


export const deletelUser = async ({ id, access_token }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};


export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true  //Tu dong lay cookie truyen xuong backend
    })
    return res.data
}


export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

// export const updateUser = async (id, data, access_token) => {
//     const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

export const updateUser = async ({ id, data, token }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${token}`,
        }
    });
    return res.data;
};


export const deleteManyUser = async ({ data, access_token }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-many/`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
