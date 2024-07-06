<template>
  <div class="el-form-item">
    <label v-if="label">{{ label }}</label>
    <slot />
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "ElFormItem"
};
</script>
<script setup lang="ts">
import { provide, inject, ref, onMounted } from "vue";
import { emitter } from "../../emitter";
import { FormItem, key } from "./type";
import Schema from "async-validator";
interface Props {
  label?: string;
  prop?: string;
}
const props = withDefaults(defineProps<Props>(), { label: "", prop: "" });

// 错误
const propVal = ref<string | undefined>("");
const error = ref<string | undefined>("");
const formData = inject(key);

provide(key, { prop: props.prop });

const o: FormItem = {
  validate
};
onMounted(() => {
  if (props.prop) {
    emitter.emit("addFormItem", o);
    emitter.on("validate", v => {
      propVal.value = v;
      validate();
    });
  }
});
function validate() {
  if (formData?.rules === undefined) {
    return Promise.resolve({ result: true });
  }
  if (props.prop === propVal.value) {
    console.log("props.prop", props.prop, propVal.value);
    const rules = formData?.rules[props.prop];
    const model = formData?.model[props.prop];
    const schema = new Schema({
      [props.prop]: rules
    });

    return schema.validate({ [props.prop]: model }, errors => {
      if (errors) {
        error.value = errors[0].message;
      } else {
        error.value = "";
      }
    });
  }
}

defineExpose(o);
</script>

<style lang="scss">
@import "../styles/mixin";
@include b(form-item) {
  margin-bottom: 22px;
  label {
    line-height: 1.2;
    margin-bottom: 5px;
    display: inline-block;
  }
  & .el-form-item {
    margin-bottom: 0;
  }
}
.error {
  color: red;
}
</style>
