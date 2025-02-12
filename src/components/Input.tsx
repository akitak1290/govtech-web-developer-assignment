import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/*
* An input element wrapper that also exposes its DOM node
* to its parents for tasks like focusing
*/
const Input = forwardRef(function Input(props: InputProps, ref: React.LegacyRef<HTMLInputElement>) {
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <input
        className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
        ref={ref}
        {...props}
      />
    </>
  );
});

export default Input;