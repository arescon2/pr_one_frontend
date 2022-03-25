import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
	timeout: 60000,
	withCredentials: true,
  headers: {
		'Content-Type': 'application/json',
	}
});

export const Get = async function (url, params) {
	try {
    return await instance.get(url, {
      params: params ? params : {}
    });
  } catch (err) {
    throw new Error(err);
  }
}

export const Post = async function (url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
      instance.post(url, data, { params }).then( result => {
        resolve(result.data, result)
      }).catch( error => {
        reject(error.response.data, error.response)
      });
    });
};

export const Put = function (url, data = {}, params = {}) {
	return instance.put(url, data, { params });
}

export const Delete = async function (url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    instance.delete(url, {
      data: data,
      params: params
    }).then( result => {
      resolve(result.data, result)
    }).catch( error => {
      reject(error.response.data, error.response)
    });
  });
}