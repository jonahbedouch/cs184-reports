'use client'
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

type Props = LinkProps;

function HeadingLink(props: Props) {
  const pathname = usePathname();

  return <Link onClick={() => {
    navigator.clipboard.writeText(`${location.protocol}//${location.host}${pathname + props.href.toString()}`)
  }} {...props} />;
}

export default HeadingLink;
