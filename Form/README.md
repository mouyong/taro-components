```jsx
import Taro from "@tarojs/taro";
import { ClFormItem, ClInput } from "mp-colorui";
import Form from "../../components/Form";
import PhoneCaptcha from "../../components/PhoneCaptcha";

import "./index.scss";

const formData = {
  phone: "",
  sms_code: "",
  example: ""
};

const rules = {
  phone: {
    required: true,
    mobile: true
  }
};

const messages = {
  phone: {
    required: "手机号不能为空",
    mobile: "手机号不正确"
  },
  sms_code: {
    required: "验证码不能为空"
  }
};

function FormChildren(props) {
  return (
    <>
      <ClFormItem>
        <ClInput
          title="示例"
          placeholder="请输入示例"
          value={props.form.example}
          onChange={val => props.setForm({ ...props.form, example: val })}
        />
      </ClFormItem>
    </>
  );
}

const Index = () => {
  function getPhoneCaptcha() {
    //
  }

  function handleSubmit() {
    Taro.showToast({
      title: "提交成功",
      icon: "none"
    });
  }

  return (
    <Form formData={formData} rules={rules} messages={messages} onClick={handleSubmit}>
      <PhoneCaptcha onClick={getPhoneCaptcha} />

      <FormChildren></FormChildren>
    </Form>
  );
};

export default Index;

```
