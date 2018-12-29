let str = require('./demo.js');
document.getElementById('app').innerHTML = str;
console.log(str);
import './index.css';
import './style.less';
if(module.hot){
    module.hot.accept();
}