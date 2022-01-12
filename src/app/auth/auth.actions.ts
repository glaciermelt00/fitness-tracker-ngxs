export const SET_AUTHENTICATED   = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export namespace AuthAction {
  export class SetAuthenticated {
    static readonly type = SET_AUTHENTICATED;
  }

  export class SetUnauthenticated {
    static readonly type = SET_UNAUTHENTICATED;
  }
}
