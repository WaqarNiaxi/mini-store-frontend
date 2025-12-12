import axios from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  // const response = await axios.post("/auth/login", payload);
  const response = {
    data:{
      user:{
        email: "waqar@gmail.com"
      },
      token:"1234567890"
    }
  }

  return response.data;
};
