// import React from "react";
import axios from "axios";

/**
 * Auth header object type
 */
// interface IAuthHeader {
//     header?: { Authorization: string }
// }

/**
 * Method collects token from local storage (if exists) and return Authorization header with Bearer token
 * It returns empty object otherwise.
 * @returns IAuthHeader
 */
const getConfig = () => {
    /* pick Auth0 token from localstorage */
    const token = localStorage.getItem('token');
    if( token ) {
        /* return auth header */
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    } else { // if no auth token found in localstorage
        /* return empty object */
        return {}
    }
}



/**
 * Axios Get Call.
 * @param url 
 * @returns 
 */
const getAPICall = (url:string) => {
    return axios.get(url, getConfig());
}

/**
 * Axios Post Call.
 * @param url 
 * @returns 
 */
const postAPICall = (url:string, data:object) => {
    return axios.post(url, data, getConfig());
}

/**
 * Axios Put Call.
 * @param url 
 * @returns 
 */
const putAPICall = (url:string, data:object) => {
    return axios.put(url, data, getConfig());
}

/**
 * Axios Delete Call.
 * @param url 
 * @returns 
 */
const deleteAPICall = (url:string) => {
    return axios.delete(url, getConfig());
}

export {
    getAPICall,
    postAPICall,
    putAPICall,
    deleteAPICall
}