import mitt from "mitt"
import { FormItem } from "./components/form1/type"
export type Events = {
  validate: undefined
  addFormItem: FormItem
}
export const emitter = mitt<Events>()
