interface RegisterValues {
  email: string;
  fullName: string;
  password: string;
  userName: string;
  dob: string;
}
interface LoginValues {
    email:string,
    password:string
}






// response data
interface RegisterType {
  status: boolean;
  message?: string;
  error?: string;
}

interface LoginType {
  status: boolean;
  message?: string;
  error?: string;
  token?: string;
}
