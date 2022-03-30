import axios from 'axios';

import _ from 'lodash';

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
        let erData = error.response.data;
        if (_.isArray(erData.message)) {
          erData.message = erData.message.map(el => el)
        }
        reject(erData, error.response)
      });
    });
};

export const Put = async function (url, data = {}, params = {}) {
	return new Promise((resolve, reject) => {
    instance.put(url, data, { params }).then( result => {
      resolve(result.data, result)
    }).catch( error => {
      let erData = error.response.data;
      if (_.isArray(erData.message)) {
        erData.message = erData.message.map(el => el)
      }
      reject(error.response.data, error.response)
    });
  });
}

export const Delete = async function (url, data = {}, params = {}) {
  return new Promise((resolve, reject) => {
    instance.delete(url, {
      data: data,
      params: params
    }).then( result => {
      resolve(result.data, result)
    }).catch( error => {
      let erData = error.response.data;
      if (_.isArray(erData.message)) {
        erData.message = erData.message.map(el => el)
      }
      reject(error.response.data, error.response)
    });
  });
}

export const isDevelop = (roles) => {
  const isDev = _.filter(roles, (role) => role.name === 'DEVELOP');
  return isDev.length > 0;
}