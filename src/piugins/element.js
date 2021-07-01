import Vue from 'vue';
import { MessageBox, Message,Pagination  } from 'element-ui';


Vue.prototype.$msgbox = MessageBox;    //引入的MessageBox挂在了Vue原型上
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.use(Pagination)//注册使用Pagination组件