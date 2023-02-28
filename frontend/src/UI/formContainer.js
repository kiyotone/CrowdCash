const FormContainer = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{props.label}</label>
      <input className="form_input" type={props.type}></input>
    </div>
  );
};

export default FormContainer;
