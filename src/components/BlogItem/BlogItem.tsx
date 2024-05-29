import { Post } from "../../types/blog.type";
interface Ipost{
post:Post
}

export const BlogItem = ({post}:Ipost) => {
  return <div className='flex flex-col border rounded-2xl overflow-hidden'>
  <div className='group relative block h-40 w-[450px] shrink-0 self-start overflow-hidden bg-gray-100 '>
    <img
      src={post.featuredImage}
      loading='lazy'
      alt='Muốn thành công thì khao khát thành công phải lớn hơn nỗi sợ bị thất bại.'
      className=' border-r-8 absolute  h-full w-full object-cover object-center  transition duration-200 hover:scale-150'
    />
  </div>
  <div className='flex flex-col gap-2 p-4 lg:p-6'>
    <span className='text-sm text-gray-400'>{post.publishDate}</span>
    <h2 className='text-xl font-bold text-gray-800'>
    {post.title}
    </h2>
    <p className='text-gray-500'>
    {post.description}
    </p>
    <div>
      <div className='inline-flex rounded-md shadow-sm' role='group'>
        <button
          type='button'
          className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
        >
          Edit
        </button>
        <button
          type='button'
          className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
};
