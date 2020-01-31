import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Form, FormItem, Input, Select, Option, Col, DatePicker, TimePicker, Switch, CheckboxGroup, Checkbox, RadioGroup, Radio, Button } from "element-ui";

Vue.config.productionTip = false

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Button);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
