const Button = ({ type = "button", onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 text-lg text-white bg-green-500 font-semibold rounded hover:bg-green-600 cursor-pointer transition duration-150 ease-in-out "
    >
      {children}
    </button>
  );
};

export default Button;
