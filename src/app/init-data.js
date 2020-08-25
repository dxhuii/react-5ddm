import { loadUserInfo } from '@/store/actions/user'

// 初始化数据
// redux 中的数据清理、以及准备一些经常不变的数据
export default async (store, user) => {
  // 一些经常通用数据，不会经常更新的数据，在服务器获取并储存在store中

  if (user) {
    const res = await loadUserInfo({ user })(store.dispatch, store.getState)
    return res
  } else {
    return []
  }
}
