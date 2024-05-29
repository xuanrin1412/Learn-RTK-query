import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from "../types/blog.type"

export const blogApi = createApi({
    reducerPath:'blogApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:4000/"}),
    endpoints: (build) =>({
        //generic type theo thứ tự là kiểu response trả về , argument 
        getPosts: build.query<Post[],void>({
            query:()=>"posts",
            // providestags có thể là array hoặc callback return argument 
            //nếu có bất kỳ một invalidatesTag nào match với providesTags này 
            //thì sẽ làm cho getPosts method chạy lại 
            //và cập nhật lại danh sách các bài pót cũng như các tags phía dưới 
            providesTags(result){ //callback này chạy mỗi khi getPosts chạy

            }
        }),
        //Dùng mutation đối với các trường hợp POST PUT DELETE
        // Post là response trả về và Omit<Post ,'id'> là body gửi lên 
        addPost: build.mutation<Post, Omit<Post, "id">> ({
            query(body){
                return {
                    url: 'posts',
                    method:"Post",
                    body
                }
            }
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation } = blogApi