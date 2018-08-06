import fetch from 'isomorphic-fetch'

const serverEndPoint = "https://reqres.in/api";
const options = {
  method: "GET"
}

const getApi = async (params, callback) => {
  
  const response = await fetch(`${serverEndPoint}/${params}`, options);
  const json = await response.json();

  if(callback){
    callback(json)
  }
}

export default getApi