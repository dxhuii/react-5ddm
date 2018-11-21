import Ajax from '../common/ajax'
import config from '../utils/config';

export const getId = ({ pinyin }) => {
  return (dispatch, getState) => {
    return new Promise(async resolve => {

      let [ err, data ] = await Ajax({
        url: config.api.getVodId({ pinyin }),
        method: 'get'
      })

      resolve([ err, data ]);

    })
  }
}
