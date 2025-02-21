'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {
  page: 'blog' | 'projects';
  tagName: string;
}

const UnfilterLink = (props: Props) => {
  const params = useSearchParams();
  const mutableParams = new URLSearchParams(params.toString());
  mutableParams.delete('filter', props.tagName);

  return (
    <Link href={{ pathname: `/${props.page}`, query: mutableParams.toString() }} className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200">
      <span className='sr-only'>stop filtering by: </span>{props.tagName}
    </Link>
  )
}

export default UnfilterLink