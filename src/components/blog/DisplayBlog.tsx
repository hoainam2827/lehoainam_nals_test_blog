import React from 'react'
import moment from 'moment';
import { BlogsDetail } from '../../redux/types/blogType'


interface IProps {
  blog: BlogsDetail
}

const DisplayBlog: React.FC<IProps> = ({blog}) => {
  return (
    <div>
      <h2 className="text-center my-3 text-capitalize fs-1"
      style={{ color: '#ff7a00' }}>
        {blog?.title}
      </h2>

      <div className="text-end fst-italic" style={{color: 'teal'}}>
        <small className="ms-2">
          Create at {moment(blog.created_at).startOf('hour').fromNow()}
        </small>
      </div>

      <div className="blog-content">
        <img src={blog?.image?.url} alt="img-blog" className="img-blog-detail" />
        <div className="content">
          {blog?.content}
        </div>
      </div>
    </div>
  )
}

export default DisplayBlog