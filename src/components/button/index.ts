import { App } from "vue";
import ElButton from "./Button.vue";
console.log("ElButton", ElButton.name);

// 在main.js中全局应用
export default {
  install(app: App) {
    app.component(ElButton.name, ElButton);
  }
};
