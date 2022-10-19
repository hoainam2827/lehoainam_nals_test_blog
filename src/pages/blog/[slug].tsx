import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/TypeScript'
import { BlogsDetail } from '../../redux/types/blogType'
import { getAPI } from '../../utils/FetchData'

import Loading from '../../components/global/Loading'
import { showErrMsg } from '../../components/alert/Alert'
import DisplayBlog from '../../components/blog/DisplayBlog'

const DetailBlog = () => {
  const id = useParams<IParams>().slug

  const [blog, setBlog] = useState<BlogsDetail>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  console.log('blog', blog)
  console.log('id', id)
  useEffect(() => {
    if(!id) return;

    setLoading(true)

    getAPI(`v2/blogs/${id}`)
    .then(res => {
      setBlog(res.data.data)
      setLoading(false)
    })
    .catch(err => {
      setError(err.response.data.msg)
      setLoading(false)
    })

    return () => setBlog(undefined)
  },[id])


  if(loading) return <Loading />;
  return (
    <div className="my-4">
      { error && showErrMsg(error) }

      { blog && <DisplayBlog blog={blog} /> }
    </div>
  )
}

export default DetailBlog