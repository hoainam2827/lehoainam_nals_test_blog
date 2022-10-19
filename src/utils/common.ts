const debounce = (timeout: any, setTimeOut: any, onSubmit: any) => {
  clearTimeout(timeout)
  timeout = setTimeOut(() => {
    onSubmit()
  }, 10000)
  setTimeOut(timeout)
}

export {
  debounce
}