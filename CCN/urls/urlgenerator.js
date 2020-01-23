import con from '../json/config';
export var loginUrl = _=> {return 'http://'+con['ip']+':'+con['port']+'/colcon/login'}
