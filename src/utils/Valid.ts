import { IUserRegister } from './TypeScript'

export const validRegister = (userRegister: IUserRegister) => {
  // const { name, email, password } = userRegister;
  const errors: string[] = [];

  if(!userRegister['user[name]']){
    errors.push("Please add your name.")
  }else if(userRegister['user[name]'].length > 20){
    errors.push("Your name is up to 20 chars long.")
  }

  if(!userRegister['user[email]']){
    errors.push("Please add your email.")
  }else if(!validateEmail(userRegister['user[email]'])){
    errors.push("Email format is incorrect.")
  }

  if(userRegister['user[password]'].length < 8){
    errors.push("Password must be at least 6 chars.")
  }

  return {
    errMsg: errors,
    errLength: errors.length
  }
}

export const checkImage = (userRegister: IUserRegister) => {
  const types = ['image/png', 'image/jpeg']
  let err = ''
  if(!userRegister['user[avatar]']) return err = "File does not exist."

  if(userRegister['user[avatar]'].size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb"

  if(!types.includes(userRegister['user[avatar]'].type))
    err = "The image type is png / jpeg"

  return err;
}

// Valid Blog
export const validCreateBlog = ((blog: any) => {
  const err: string[] = []
  console.log('blog valid', blog)

  if(blog['blog[title]'].trim().length < 10){
    err.push("Title has at least 10 characters.")
  }else if(blog['blog[title]'].trim().length > 50){
    err.push("Title is up to 50 characters long.")
  }

  if(blog['blog[content]'].trim().length < 50){
    err.push("Content has at least 50 characters.")
  }

  if(!blog['blog[image]']){
    err.push("Thumbnail cannot be left blank.")
  }

  return {
    errMsg: err,
    errLength: err.length
  }

})

export function validPhone(phone: string) {
  const re = /^[+]/g
  return re.test(phone)
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}