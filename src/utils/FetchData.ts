import axios from 'axios'
import axiosClient from '../api/axiosClient';

export const postAPI = async (url: string, post?: object) => {
  console.log('post', post)
  const res = await axiosClient.post(`/api/${url}`, post)
  return res;
}

export const getAPI = async (url: string) => {
  const res = await axiosClient.get(`/api/${url}`)
  return res;
}

export const deleteAPI = async (url: string) => {
  const res = await axiosClient.delete(`/api/${url}`)

  return res;
}

export const deleteLogOutAPI = async (url: string, token:string) => {
  const res = await axios.delete(`https://api-placeholder.herokuapp.com/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return res;
}
export const loginGoogleAPI = async (url: string, token:any) => {
  const res = await axios.post(`https://api-placeholder.herokuapp.com/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return res;
}