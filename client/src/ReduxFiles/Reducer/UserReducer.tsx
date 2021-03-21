import { DispatchTypes, LOGIN, REGISTER } from '../Types/Types';

interface DefaultStateI {
    register?: RegisterType,
    login?:LoginType
  }
  const initialState:DefaultStateI ={
      register:{
          status:false,
          message:"",
          error:""
      },
      login:{
        status:false,
        message:"",
        error:"",
        token:""
      }
  }
 const mainReducer = (state:DefaultStateI = initialState, action:DispatchTypes):DefaultStateI => {
    switch (action.type) {
        case REGISTER:
            return { ...state, register: action.payload };
            case LOGIN:
                return { ...state, login: action.payload };
        default:
            return state;
    }
}
export default mainReducer