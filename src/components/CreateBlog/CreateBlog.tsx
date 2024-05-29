import { useState } from "react";
import { Post } from "../../types/blog.type";
import { useAddPostMutation } from "../../reduxSlice/blog.service";
const initialState: Omit<Post, "id">={
    title: "",
    description: "",
    publishDate: "",
    featuredImage: "",
    published: false,

}

export const CreateBlog = () => {
    const [formData, setFormData] = useState<Omit<Post, "id">>(initialState)
    const [addPost, addPostresult] = useAddPostMutation()
    console.log("addPostresult",addPostresult);
    
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
      const result = await  addPost(formData).unwrap()
      console.log({result});
      setFormData(initialState)
      console.log(result);
      
      
    }
  return <form onSubmit={handleSubmit} className=" w-full flex flex-col justify-center ">
    <div className=" w-2/4 mx-auto space-y-5 mt-10">
        <div className="space-x-5 flex items-center ">
            <label htmlFor="title" className=" font-bold text-xl">Title</label>
            <input value={formData.title} onChange={event=>setFormData((prev)=>({...prev,title:event.target.value}))} className="flex-1 px-4 h-10 border-2 border-gray-300 rounded-xl" id="title" type="text" placeholder="Nhập tên"/>
        </div>
        <div className="space-x-5 flex items-center ">
            <label htmlFor="title" className=" font-bold text-xl">Image URl</label>
            <input value={formData.featuredImage} onChange={event=>setFormData((prev)=>({...prev,featuredImage:event.target.value}))}  className="flex-1 px-4 h-10 border-2 border-gray-300 rounded-xl" id="title" type="text" placeholder="Nhập tên"/>
        </div>
        <div className="space-x-5 flex items-center ">
            <label htmlFor="title" className=" font-bold text-xl">Description</label>
            <input value={formData.description} onChange={event=>setFormData((prev)=>({...prev,description:event.target.value}))}  className="flex-1 px-4 h-10 border-2 border-gray-300 rounded-xl" id="title" type="text" placeholder="Enter Description..."/>
        </div>
        <div className="space-x-5 flex items-center ">
            <label htmlFor="title" className=" font-bold text-xl">Publish Date</label>
            <input value={formData.publishDate} onChange={event=>setFormData((prev)=>({...prev,publishDate:event.target.value}))} className="flex-1 px-4 h-10 border-2 border-gray-300 rounded-xl" id="title" type="datetime-local" placeholder="Nhập tên"/>
        </div>
        <div className="flex items-center space-x-3">
            <input checked={formData.published} onChange={event=>setFormData((prev)=>({...prev,published:event.target.checked}))} type="checkbox" className=" h-5 w-5"/>
            <label className=" font-bold text-xl">Publish</label>
        </div>
    </div>
    <div className="flex justify-center space-x-4 mt-10">
        <button type="submit" className="py-2 px-4  text-white bg-black hover:bg-red-700">Publish Post</button>
        {/* <button type="submit" className="py-2 px-4 text-white bg-black  hover:bg-red-700">Update Post</button>
        <button type='reset' className="py-2 px-4  text-white bg-black  hover:bg-red-700">Cancel</button> */}
    </div>
</form>;
};
