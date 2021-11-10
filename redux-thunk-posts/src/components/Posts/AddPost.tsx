import React, { useState } from "react";
import { useHistory } from "react-router";
import { createPost } from "../../redux/action";
import { useDispatch } from "react-redux";
import { postFilePostImage } from "../../redux/action";
import { API_URL } from "../../redux/types";
const AddPost: React.FC = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [fileImage,setFileImage]=useState<any>('')
  const handleFileImage=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    try{
      if(!e.target.files)return ;
   const fileImage=await e.target.files[0];           
         setFileImage(fileImage);    
         

    }catch(error:any){
     throw new Error(error)
    }

 
  }
  const handleSubmitForm = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const randomId = Math.random().toString(36).split("").slice(7).join(".");
    const formData = new FormData();  
    formData.append("file",fileImage);
    await postFilePostImage(formData);
    console.log(fileImage.name);    
    const new_post = {
      id: randomId,
      title,
      body,
      url_image:API_URL+'uploads/'+String(fileImage.name),
    };
    dispatch(createPost(new_post));
    history.push("/");
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Add A Post</div>
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="form-group">
                <input
                  type="file"                
                  accept="image/png, image/jpeg,image/jpg"
                  onChange={(e) => handleFileImage(e)} />
              
                <br />
                <br />
                <h1>Title</h1>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <h1>Body</h1>
                <textarea
                  rows={5}
                  className="form-control form-control-lg"
                  placeholder="Enter Post Body Text"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                ></textarea>
              </div>
              <br />
              <button className="btn btn-primary btn-lg">Add New Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
