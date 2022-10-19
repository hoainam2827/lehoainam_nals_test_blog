import { useContext, useState } from "react";
// import "./write.css";
import axios from "axios";
import { postAPI } from '../utils/FetchData'
import { ALERT, IAlertType } from '../redux/types/alertType'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { validCreateBlog } from '../utils/Valid'
// import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<any>("");
  const dispatch = useDispatch()
  const history = useHistory()
  // const { user } = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newPost = {
      'blog[title]': title,
      'blog[content]': desc,
      'blog[image]': file,
    };
    if (file) {
      const newPost2: any = {
        'blog[title]': title,
        'blog[content]': desc,
        'blog[image]': file,
      };

      const check = validCreateBlog(newPost2)
      if(check.errLength !== 0){
        return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
      }
      else{
        const bodyFormData: any = new FormData();
        Object.keys(newPost2).forEach(key => {
          const value = newPost2[key];
          bodyFormData.append(key, value);
        });

        try {
          dispatch({ type: ALERT, payload: { loading: true } })
          await postAPI("v2/blogs", bodyFormData);
          history.push('/')
          dispatch({ type: ALERT, payload: { success: "Post Success!" } })
        } catch (err) {
          dispatch({ type: ALERT, payload: { errors: "Post Fail!" } })
        }
      }
    }
    else{
      const check = validCreateBlog(newPost)
      if(check.errLength !== 0){
        return dispatch({ type: ALERT, payload: { errors: check.errMsg } })
      }
      else{
        try {
          dispatch({ type: ALERT, payload: { loading: true } })
          await postAPI("v2/blogs", newPost);
          history.push('/')
          dispatch({ type: ALERT, payload: { success: "Post Success!" } })
        } catch (err) {
          dispatch({ type: ALERT, payload: { errors: "Post Fail!" } })
        }
      }
    }
  };

  const handleFileRead = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
      {/* <form className="writeForm"> */}
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            required
            // style={{ display: "none" }}
            onChange={(e) => handleFileRead(e)}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            required
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            // type="text"
            className="writeInput writeText"
            required
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}