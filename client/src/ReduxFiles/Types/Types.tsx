export const REGISTER = 'register';
export const LOGIN = 'login';
export const AUTH = 'auth';

export interface RegisterUser {
    type: typeof REGISTER
    payload: RegisterType
  }

  export interface LoginUser {
    type: typeof LOGIN
    payload: LoginType
  }

  export interface AuthUser {
    type: typeof AUTH
    payload: AuthType
  }

  export type DispatchTypes = RegisterUser | LoginUser| AuthUser