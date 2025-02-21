'use client'

import useRawBoop from "@/hooks/use-raw-boop.hook";
import { IconCheck, IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
import { MouseEvent } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const copy = (e: MouseEvent<HTMLButtonElement>) => {
  const data = e.currentTarget.attributes.getNamedItem('data')
  if (data === null) { return; }
  navigator.clipboard.writeText(data.value);
  return;
}

function CopyButton({ className, ...props }: ButtonProps) {
  let [isBooped, trigger] = useRawBoop(1000);


  return (
    <button className={`w-6 h-6 ${className ?? ''}`} onClick={(e) => { copy(e); trigger(); }} {...props}>
      <IconCopy className={`absolute w-full h-full p-0.5 top-0 ${isBooped ? 'opacity-0 invisible' : 'block'} text-secondary-1000 dark:text-secondary-0 transition-all`} aria-hidden={true} focusable={false} />
      {/* <IconCopyCheckFilled className={`absolute w-full h-full p-0.5 top-0 ${isBooped ? 'opacity-0 invisible' : 'block group-hover:visible group-hover:opacity-100 invisible opacity-0'} text-secondary-1000 dark:text-secondary-0 transition-all`} aria-hidden={true} focusable={false} /> */}
      <IconCheck className={`absolute w-full h-full p-0.5 top-0 ${isBooped ? 'block' : 'opacity-0 invisible'} text-green-600 dark:text-green-500 transition-all`} aria-hidden={true} focusable={false} />
    </button>
  );
}

export default CopyButton;
