import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL : "http://localhost:3000" // it's not recommended to have this info here.
});

// implement a method to execute all the request from here.
const apiRequest = (method: string, url: string, request: Request) => {
    //using the axios instance to perform the request that received from each http method
    return axiosAPI({
        method,
        url,
        data: request
      }).then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

// function to execute the http get request
const get = (url: string, request: Request) => apiRequest("get",url,request);

// function to execute the http delete request
const deleteRequest = (url: string, request: Request) =>  apiRequest("delete", url, request);

// function to execute the http post request
const post = (url: string, request: Request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url: string, request: Request) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url: string, request: Request) =>  apiRequest("patch", url, request);

// expose your method to other services or actions
export const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};