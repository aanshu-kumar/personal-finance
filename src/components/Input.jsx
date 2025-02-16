
// eslint-disable-next-line react/prop-types
const Input = ({ label, type, placeholder, setState, state }) => {
  return (
    <div className="my-2">
      <label className="text-sm">{label}:</label>
      <br />
      <input
        className="border-b-2 border-gray-300 w-full my-1"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        type={type}
        placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
