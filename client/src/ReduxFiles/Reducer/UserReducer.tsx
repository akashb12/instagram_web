import { AUTH, DispatchTypes, LOGIN, REGISTER } from '../Types/Types';

interface DefaultStateI {
    register?: RegisterType,
    login?:LoginType,
    auth?:AuthType
  }
  const initialState:DefaultStateI ={
      register:{
          status:false,
          alreadyRegistered:false,
          message:"",
          error:""
      },
      login:{
        status:false,
        message:"",
        error:"",
        token:""
      },
      auth:{
        status:false,
        message:"",
        error:"",
        id:0,
        full_name:"",
        email:"",
        username:"",
        isPrivate:false,
        profileImage:""
      }
  }
 const mainReducer = (state:DefaultStateI = initialState, action:DispatchTypes):DefaultStateI => {
    switch (action.type) {
        case REGISTER:
            return { ...state, register: action.payload };
            case LOGIN:
                return { ...state, login: action.payload };
                case AUTH:
                return { ...state, auth: action.payload };
        default:
            return state;
    }
}
export default mainReducer