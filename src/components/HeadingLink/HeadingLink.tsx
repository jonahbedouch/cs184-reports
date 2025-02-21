"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type Props = LinkProps & { className: string };

function HeadingLink(props: Props) {
  const pathname = usePathname();

  return (
    <Link
      onClick={() => {
        navigator.clipboard.writeText(
          `${location.protocol}//${location.host}${pathname + props.href.toString()}`,
        );
      }}
      {...props}
    />
  );
}

export default HeadingLink;
