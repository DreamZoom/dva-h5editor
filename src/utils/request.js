import fetch from 'dva/fetch';
import jquery from 'jquery';
function parseJSON(response) {
  return JSON.parse(response);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
//export default function request(url, options) {
//return fetch(url, options)
//  .then(checkStatus)
//  .then(parseJSON)
//  .then(data => ({ data }))
//  .catch(err => ({ err }));
//}
const API_DOMAIN = "http://localhost:6531/";
export default function request(url, options) {
	options =jquery.extend({
		url:API_DOMAIN+url,
		dataType: "json",
		type:'post'
	},options);
  return jquery.ajax(options)
//  .then(checkStatus)
//  .then(parseJSON)
    .then(data => ({ ...data }))
    .catch(err => ({ err }));
}
