interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //label?: string
}

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className="rounded-md bg-[#1C76D5] text-white py-3 px-5 flex gap-1">
      {props.children}
    </button>
  );
}
