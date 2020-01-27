import con from '../json/config';
export var loginUrl = _=> {return 'http://'+con['ip']+':'+con['port']+'/colcon/login'}
export var forgotPwdUrl = (id) => {return 'http://'+con['ip']+':'+con['port']+'/colcon/forgotpassword/'+id}
export var resetPwdUrl = (id,pwd)=>{return 'http://'+con['ip']+':'+con['port']+'/colcon/resetpassword/'+id+'/'+pwd}