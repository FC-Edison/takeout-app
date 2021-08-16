import { Button, Dialog, MessageBox, Message } from 'element-ui'
const element = {
  install: function(Vue) {
    Vue.component(Button.name, Button)
    Vue.component(Dialog.name, Dialog)
    Vue.component(MessageBox.name, MessageBox)
    Vue.component(Message.name, Message)
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = Message
  }
}
export default element
