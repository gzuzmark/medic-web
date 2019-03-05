/*
 * action types
 */

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_OUT = 'LOGIN_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

/*
 * other constants

export const VisibilityFilters = {
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
}

 */

/*
 * action creators
 */

export function loginSuccess(user: any) {
    return { type: LOGIN_SUCCESS, user, loading: false, errorMessage: '' }
}

export function loginIn() {
    return { type: LOGIN_IN, user: null, loading: true, errorMessage: '' }
}

export function loginOut(filter: string) {
    return { type: LOGIN_OUT, user: null, loading: false, errorMessage: '' }
}

export function loginError(error: string) {
    return { type: LOGIN_ERROR, user: null, loading: false, errorMessage: error }
}
