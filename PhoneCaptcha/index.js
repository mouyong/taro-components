import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { ClFormItem, ClInput } from "mp-colorui";

let timer;

function Captcha(props) {
  const phone = props.phone_prop || "phone";
  const sms_code = props.sms_code_prop || "sms_code";
  const second = props.second || 60;

  const [time, setTime] = useState(second);
  const [btnDisable, setBtnDisable] = useState(false);
  const [btnContent, setBtnContent] = useState("获取验证码");

  useEffect(() => {
    if (btnDisable === false) {
      return;
    }

    if (time > 0 && time <= second) {
      setBtnContent(`${time}s后重发`);
      timer = setTimeout(() => setTime(time - 1), 1e3);
    }

    if (time === 0) {
      clearTimeout(timer);
      setBtnDisable(false);
      setBtnContent("获取验证码");
      setTime(second);
    }

    return () => clearTimeout(timer);
  }, [time, second, btnDisable]);

  const getPhoneCaptcha = () => {
    setBtnDisable(true);

    if (typeof props.onClick === "function") {
      props.onClick();
    }

    Taro.showToast({
      title: "验证码已发送",
      icon: "none"
    });
  };

  return (
    <>
      <ClFormItem prop={phone} required>
        <ClInput
          title="手机号"
          placeholder="请输入手机号"
          value={props.form.phone}
          onChange={val => props.setForm({ ...props.form, [phone]: val })}
        />
      </ClFormItem>
      <ClFormItem prop={sms_code} required>
        <ClInput
          title="验证码"
          placeholder="请输入验证码"
          value={props.form.sms_code}
          onChange={val => props.setForm({ ...props.form, [sms_code]: val })}
          type="text"
          adjustPosition
          button={{
            text: btnContent,
            bgColor: "light-blue",
            disabled: btnDisable,
            onClick() {
              getPhoneCaptcha();
            }
          }}
        />
      </ClFormItem>
    </>
  );
}

export default Captcha;
