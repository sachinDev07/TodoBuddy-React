import { RxCross2 } from "react-icons/rx";

const CrossButton = ({ title, onClick, size, color }) => {
  const defaultSize = size || "1.2em";
  const defaultColor = color || "red";

  return (
    <RxCross2
      title={title}
      onClick={onClick}
      size={defaultSize}
      // color={defaultColor}
      className={`cursor-pointer font-bold border text-red-500 border-red-400 hover:border-red-600 active:text-white active:bg-red-600 p-1 rounded-full transition duration-150 ease-in-out`}
    />
  );
};

export default CrossButton;
