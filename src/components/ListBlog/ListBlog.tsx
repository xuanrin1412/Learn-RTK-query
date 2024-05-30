import { Fragment } from "react/jsx-runtime";
import { useDeletePostMutation, useGetPostsQuery } from "../../reduxSlice/blog.service";
import { BlogItem } from "../BlogItem/BlogItem";
import { Skeleton } from 'antd';
import { useDispatch } from "react-redux";
import { startEditPost } from "../../reduxSlice/blog.slice";

export const ListBlog = () => {
  //isLoading chỉ dành cho lần fetch đầu tiên 
  //isFetchign là cho mỗi lần gọi api 
  const dispatch = useDispatch()
  const { data, isLoading, isFetching } = useGetPostsQuery()
  const [deletePost] = useDeletePostMutation()
  console.log(isLoading);

  const handleDeletePost = (id:string) =>{
    deletePost(id)
  }
  

  const startEdit = (id:string)=>{
    dispatch(startEditPost(id))
  }

  return <div className="w-full flex flex-col items-center mt-20">
    <div className="mb-10 text-2xl font-bold">List Blog</div>
    <div className="grid grid-cols-3 w-11/12 gap-4">
      {isFetching && (
        <Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Fragment>
      )}
      {!isFetching &&
      data?.map((post)=>(<BlogItem key={post.id} post={post} startEdit={startEdit} handleDeletePost={handleDeletePost} />))}
    </div>
  </div>;
};
