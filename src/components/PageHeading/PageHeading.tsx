import { SectionH1 } from '@/helpers/mdx.helper';
import * as React from 'react';
import UnfilterLink from './UnfilterLink';
import { BlogCategoryDescriptions, BlogDesc, ProjectCategoryDescriptions, ProjectDesc } from '../../../content/categories';

type Props = {
  appliedCategory: keyof typeof ProjectCategoryDescriptions | keyof typeof BlogCategoryDescriptions | undefined;
  appliedTags: string[] | undefined;
  page: 'blog' | 'projects';
  numResults?: number;
}

function PageHeading(props: Props) {

  const getCategoryDescription = () => {
    if (props.page === 'blog') {
      return props.appliedCategory && props.appliedCategory in BlogCategoryDescriptions ? BlogCategoryDescriptions[props.appliedCategory as keyof typeof BlogCategoryDescriptions] :
        BlogDesc;
    }
    else {
      return props.appliedCategory && props.appliedCategory in ProjectCategoryDescriptions ? ProjectCategoryDescriptions[props.appliedCategory as keyof typeof ProjectCategoryDescriptions] :
        ProjectDesc;
    }
  }

  const getTitle = () => {
    if (props.page === 'blog') {
      return `Recent Posts ${props.appliedCategory ? `in ${props.appliedCategory}` : ``}`
    } else {
      return `Recent Projects ${props.appliedCategory ? `in ${props.appliedCategory}` : ``}`
    }
  }


  return <>
    <SectionH1 className='items-center'>{getTitle()} {props.numResults !== undefined ? <span className={`text-secondary-800 dark:text-secondary-400 ml-auto text-xl`}> ({props.numResults})</span> : <></>}</SectionH1>
    <p className='mt-2'>{getCategoryDescription()}</p>
    {props.appliedTags ? <p className="m-0 p-0 italic text-sm text-secondary-800 dark:text-secondary-400">
      Filtering by {props.appliedTags.map((val, i) => [i > 0 && ", ", <UnfilterLink key={`${props.page}-unlink-tag-${val}`} page={props.page} tagName={val} />])}
    </p> : <></>}
  </>;
}

export default PageHeading;
