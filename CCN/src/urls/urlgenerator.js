import Constants from "expo-constants";
const { manifest } = Constants;
export const uri = `http://${manifest.debuggerHost.split(':').shift()}:8000`;
export var loginUrl = _=> {return uri+'/colcon/login'}
export var forgotPwdUrl = (id) => {return uri+'/colcon/forgotpassword/'+id}
export var resetPwdUrl = (id,pwd)=>{return uri+'/colcon/resetpassword/'+id+'/'+pwd}
export var logout = ()=>{return uri+ '/colcon/logout'}
export var profilePicUpload = () =>{return uri+'/colcon/ppu'}
export var ChannelList = ()=>{return uri+'/colcon/channelList'}