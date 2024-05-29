import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reduxSlice/blog.slice'
import { blogApi } from './reduxSlice/blog.service'
import { setupListeners } from '@reduxjs/toolkit/query'
// ...

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer // thêm reducer dc tạo từ api slice
  },
  //Thêm api middleware để enable các tính năng như caching, invalidate, polling của rtk-query
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(blogApi.middleware)
  }
})
//Opional , nhưng bắt buộc nếu dùng tính năng refetchOnFoucus/refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch