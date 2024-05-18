// 获取组件的类型;
import { ref } from "vue";
export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>>();
}
