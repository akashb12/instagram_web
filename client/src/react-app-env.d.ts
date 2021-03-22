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
  alreadyRegistered?:boolean
  message?: string;
  error?: string;
}

interface LoginType {
  status: boolean;
  message?: string;
  error?: string;
  token?: string;
}

interface AuthType {
  status: boolean;
  message?: string;
  error?: string;
  id?: number;
  full_name?:string,
  email?:string,
  username?:string,
  isPrivate?:boolean
}
