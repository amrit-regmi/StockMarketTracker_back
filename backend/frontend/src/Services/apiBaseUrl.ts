/**Function to store apiBaseUrl to local storage  */
export const setBaseApiBaseUrlToHost = ():void => {
  sessionStorage.setItem('apiBaseUrl','http://'+window.location.host)
}

export const resetBaseApiBaseUrl = ():void => {
  sessionStorage.removeItem('apiBaseUrl')
}