/**
 * @name ResponseCode
 * @enum {string}
 * @description Enum definition for response code returned by REST services.
 * @example
 * import { ResponseCode } from 'react-base-ui/lib/RestClient'
 * //....
 * if (response.code === ResponseCode.SESSION_TIMEOUT){
 *  //....
 * }
 */

/**
 * @constant
 * @memberof ResponseCode
 */
export const SUCCESS = '0000'; // "Unhandled exception"
/**
 * @constant
 * @memberof ResponseCode
 */
export const NO_RESULT = '0001'; // "No result found"
/**
 * @constant
 * @memberof ResponseCode
 */
export const SESSION_TIMEOUT = '0002'; // "This session has timed out. You must log in again."
/**
 * @constant
 * @memberof ResponseCode
 */
export const PEAK_LOAD_PERIOD = '0003'; // "Function is disabled during peak load period"
/**
 * @constant
 * @memberof ResponseCode
 */
export const FUNCTION_NOT_FOUND = '0004'; // "You request function doesn't found"
/**
 * @constant
 * @memberof ResponseCode
 */
export const NO_LICENSE = '0005'; // "No license"
/**
 * @constant
 * @memberof ResponseCode
 */
export const COOKIE_REQUIRED = '0006'; // "Cookie required"
/**
 * @constant
 * @memberof ResponseCode
 */
export const UI_SESSION_TIMEOUT = '0007'; // "This session has timed out."
/**
 * @constant
 * @memberof ResponseCode
 */
export const AUTH_TOKEN = '0009'; // "Request auth token error"
/**
 * @constant
 * @memberof ResponseCode
 */
export const USER_NOT_LOGIN = '0010'; // "User not login."
/**
 * @constant
 * @memberof ResponseCode
 */
export const INVALID_TOKEN = '0011'; // "The token is invalid."
/**
 * @constant
 * @memberof ResponseCode
 */
export const UNKNOWN_ERROR = '9999'; // "Unknown error"


/**
 * @ignore
* Business error code, the rules is:
*
* facility     : 1000 ~ 1999
* membership   : 2000 ~ 2999
* activity     : 3000 ~ 3999
* daycare      : 4000 ~ 4999
* customer     : 5000 ~ 5999
* equipment    : 6000 ~ 6999
* financial    : 7000 ~ 7999
* sys setting  : 8000 ~ 8999
* other module : 9001 ~ 9998
*/
