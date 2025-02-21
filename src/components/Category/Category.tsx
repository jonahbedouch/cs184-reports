'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

type Props = {
  page: 'blog' | 'projects';
  category: string;
  className?: string;
}

function Category(props: Props) {
  const params = useSearchParams();
  const mutableParams = new URLSearchParams(params.toString());
  const inParams = mutableParams.getAll('category').includes(props.category);

  if (inParams) {
    mutableParams.delete('category');
  } else {
    mutableParams.set('category', props.category);
  }

  return <Link href={{ pathname: `/${props.page}`, query: mutableParams.toString() }} className={`min-w-max py-0.5 px-1 hover:shadow-md shadow-sm rounded-md ${inParams ? 'bg-primary-200 hover:bg-primary-300 dark:bg-primary-800 dark:hover:bg-primary-900' : 'bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-200 dark:hover:bg-primary-800'} ${props.className ?? ''} `}>
    <span className='sr-only'>{inParams ? 'stop filtering by category: ' : 'filter by category: '}</span>{props.category}
  </Link>;
}

export default Category;
