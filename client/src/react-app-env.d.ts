interface RegisterValues {
  email: string;
  fullName: string;
  password: string;
  userName: string;
  dob: string;
}
interface LoginValues {
  email: string;
  password: string;
}




// response data
interface RegisterType {
  status: boolean;
  alreadyRegistered?: boolean;
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
  error?: AuthError;
  id?: number;
  full_name?: string;
  email?: string;
  username?: string;
  isPrivate?: boolean;
  profileImage?: string;
  bio?:string
}
interface AuthError{
  name:string,
}


// user profile
interface UserProfile {
  id: number;
  profile_image: string;
  full_name:string,
  username:string
}


// user details
interface UserDetails{
  followId:number,
  profileName:string,
  profileImage:string,
  bio:"",
  followers:number,
  following:number,
  postsCount:number,
  message:string,
  requested:boolean
}
interface UserPosts{
  id:number,
  attachment_url:string
}


// params
interface Params {
  id: string;
}

interface Likes {
  user_id: number,
  user: LikesUser
}
interface LikesDataType{
  isOpen:boolean
  AllLikes:Likes[]
}