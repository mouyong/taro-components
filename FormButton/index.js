import { ClLayout, ClButton } from "mp-colorui";


function FormButton(props) { 
  const btnText = props.btnText || '提交'

  function handleSubmit() {
    if (typeof props.validateForm === 'function') {
      props.validateForm().then(data => {
        if (typeof props.onClick === "function") {
          props.onClick(data);
        }
      })
    }
  }

  return (
    <ClLayout margin="small" marginDirection="top">
      <ClButton shape="radius" long onClick={handleSubmit}>
        {btnText}
      </ClButton>
    </ClLayout>
  );
}

export default FormButton;
