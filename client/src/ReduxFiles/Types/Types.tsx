export const REGISTER = 'register';
export const LOGIN = 'login';

export interface RegisterUser {
    type: typeof REGISTER
    payload: RegisterType
  }

  export interface LoginUser {
    type: typeof LOGIN
    payload: LoginType
  }

  export type DispatchTypes = RegisterUser | LoginUser