import axios from "axios"

export const getData = () => {
 return axios.get('https://jsonplaceholder.typicode.com/users')
 .then((res) => {
    return res?.data
 })
 .catch((err) => console.log('err',err))
}

export const getPostData = () => {
   return axios.get('https://jsonplaceholder.typicode.com/posts')
   .then((res) => {
      return res?.data
   })
   .catch((err) => console.log('err',err))
  }

  export const addPostData = (data) => {
   return axios.post('https://jsonplaceholder.typicode.com/posts',data)
   .then((res) => {
      console.log('res',res);
      return res?.data
   })
   .catch((err) => console.log('err',err))
  }