import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:8000`;
console.log(uri);
export var loginUrl = _=> {return uri+'/colcon/login'}
export var forgotPwdUrl = (id) => {return uri+'/colcon/forgotpassword/'+id}
export var resetPwdUrl = (id,pwd)=>{return uri+'/colcon/resetpassword/'+id+'/'+pwd}