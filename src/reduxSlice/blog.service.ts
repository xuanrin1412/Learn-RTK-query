import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from "../types/blog.type"

export const blogApi = createApi({
    reducerPath:'blogApi',
    tagTypes:['Posts'], //định danh những kiểu tag cho phép dùng trong blogApi
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:4000/"}),
    endpoints: (build) =>({
        //generic type theo thứ tự là kiểu response trả về , argument 
        getPosts: build.query<Post[],void>({
            query:()=>"posts",
            // providestags có thể là array hoặc callback return argument 
            //nếu có bất kỳ một invalidatesTag nào match với providesTags này 
            //thì sẽ làm cho getPosts method chạy lại 
            //và cập nhật lại danh sách các bài pót cũng như các tags phía dưới 
            providesTags(result){// result là kết quả khi getPosts thành công, providesTags này chạy mỗi khi getPosts chạy
                if(result){
                    const final = [
                        ...result.map(({id})=>({type:"Posts" as const,id})),{type:"Posts" as const,id:"LIST"}
                    ]
                    return final
                }
                // c1
                // const final = [{type:"Posts" as const,id:"LIST"}]
                // return final
                // c2
                return [{type:"Posts",id:"LIST"}]
            }
        }),
        //Dùng mutation đối với các trường hợp POST PUT DELETE
        // Post là response trả về và Omit<Post ,'id'> là body gửi lên 
        addPost: build.mutation<Post, Omit<Post, "id">> ({ //gửi đi Post trừ thuộc tính id vì thường được server tự động tạo ra 
            query(body){
                return {
                    url: 'posts',
                    method:"POST",
                    body
                }
            },
            invalidatesTags: (result,error,body)=>[{type:"Posts",id:"LIST"}]
        }),
        getPost:build.query<Post,string>({
            query:(id)=>`posts/${id}`
        }),
        updatePost: build.mutation<Post ,{id:string;body:Post} >({
            query(data){
                return {
                    url: `posts/${data.id}`,
                    method:"PUT",
                    body:data.body
                }
            },
            // trong  trường hợp này thì getPosts sẽ chạy lại 
            invalidatesTags:  (result,error,data)=>[{type:"Posts",id:data.id}]
        }),
        deletePost: build.mutation<object, string>({
            query(id){
                return {
                    url: `posts/${id}`,
                    method:"DELETE"
                }
            },
            // trong  trường hợp này thì getPosts sẽ chạy lại 
            invalidatesTags:  (result,error,id)=>[{type:"Posts",id}]
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation , useDeletePostMutation} = blogApi