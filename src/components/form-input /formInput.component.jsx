const FormInput = (label, changeHandler, name, value, type) => {
  return (
    <div>
      <label> {label} </label>
      <input
        type={type}
        required
        onChange={changeHandler}
        name={name}
        value={value}
      ></input>
    </div>
  );
};
