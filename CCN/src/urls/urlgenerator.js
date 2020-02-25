import Constants from "expo-constants";
const { manifest } = Constants;
export const uri = `http://${manifest.debuggerHost.split(':').shift()}:8000`;
export var loginUrl = _=> {return uri+'/colcon/login'}
export var forgotPwdUrl = (id) => {return uri+'/colcon/forgotpassword/'+id}
export var resetPwdUrl = (id,pwd)=>{return uri+'/colcon/resetpassword/'+id+'/'+pwd}
export var logout = ()=>{return uri+ '/colcon/logout'}
export var profilePicUpload = () =>{return uri+'/colcon/ppu'}
export var ChannelList = ()=>{return uri+'/colcon/channelList'}
export var invitationList = ()=>{return uri+'/colcon/invitationList'}
export var AddPost = ()=>{return uri+'/colcon/addPost'}
export var getPost = (channel)=>{return uri+'/colcon/getPost/'+channel}
export var AddComment = ()=>{return uri+'/colcon/addComment'}
export var getComments = (id)=>{return uri+'/colcon/getComment/'+id}
export var AddChannel = ()=>{return uri+'/colcon/addChannelRequest'}
export var AddComplaint = ()=>{return uri+'/colcon/addComplaint'}
export var processInvitation = ()=>{return uri+'/colcon/processInvitation'}
export var AddPeople = ()=>{return uri+'/colcon/addPeople'}
export var GetPeople = (type,dept,year,sec)=>{return uri+'/colcon/getPeople/'+type+'/'+dept+'/'+year+'/'+sec}
export var DeleteChannel = (channel)=>{return uri+'/colcon/deleteChannel/'+channel}
export var ChangePassword = ()=>{return uri+'/colcon/changePwd'}