import Ajax from '@/common/ajax'
import { getSlide } from '../reducers/slide'
import config from '@/utils/config'

export function slide() {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let slide = getSlide(getState())
      slide.loading = true
      if (!slide.data) slide.data = []

      dispatch({ type: 'GET_SLIDE', data: slide })

      let [err, data] = await Ajax({
        url: config.api.slide,
        method: 'get'
      })

      if (data && data.status) {
        slide.loading = false
        slide.data = data.data
        dispatch({ type: 'GET_SLIDE', data: slide })
        resolve([null, slide.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
