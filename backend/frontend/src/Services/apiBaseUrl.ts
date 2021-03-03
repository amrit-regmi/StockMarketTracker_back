/**Function to store apiBaseUrl to local storage  */
export const setBaseApiBaseUrlToHost = ():void => {
  let apibaseUrl = process.env.HOSTNAME || window.location.host
  if((window.location.host.includes('localhost'))){

    apibaseUrl = 'http://localhost:8080'
  }
  sessionStorage.setItem('apiBaseUrl',apibaseUrl)
}

export const resetBaseApiBaseUrl = ():void => {
  sessionStorage.removeItem('apiBaseUrl')
}