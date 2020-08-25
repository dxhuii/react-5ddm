import axios from 'axios'
import qs from 'qs'

const AJAX = ({ url = '', method = 'get', data = {}, headers = {} }) => {
  const option = { url, method, headers }
  if (method === 'get') {
    data._t = new Date().getTime()
    option.params = data
  } else if (method === 'post') {
    option.data = qs.stringify(data)
  }

  return axios(option)
    .then(resp => {
      if (resp && resp.data) {
        const res = resp.data
        return [null, res]
      } else {
        return ['return none']
      }
    })
    .catch(function (error) {
      if (error && error.response && error.response.data) {
        return [error.response.data]
      } else {
        return ['return error']
      }
    })
}

export default AJAX
