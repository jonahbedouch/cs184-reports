'use client'
import * as React from 'react';

interface Props {
  className?: string;

  children: React.ReactElement;
  skipTo: string;
}

function SkipLink(props: Props) {
  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const container: (HTMLElement | null) = document.querySelector(props.skipTo);

    if (container) {
      container.tabIndex = -1;
      container.focus();
      setTimeout(() => container.removeAttribute("tabindex"), 1000);
    }
  };

  return React.cloneElement(props.children, { onClick, className: `absolute -translate-y-[200%] focus:translate-y-5 ${props.className}` });
}

export default SkipLink;
// .skip - link {
//   margin - right: 1rem;
//   position: absolute;
//   transform: translateX(-200 %);
//   transition: transform 0.3s;

//     &:focus {
//     position: static;
//     transform: translateX(0);
//   }
// }