import { getCachedSidebarContent } from '@/helpers/frontmatter.helper';
import * as React from 'react';
import ContentCard from '../ContentCard';

type Props = {
  type: 'blog' | 'projects'
}

async function FeaturedPosts(props: Props) {
  const { featured } = await getCachedSidebarContent(props.type);
  const type = props.type === 'projects' ? 'project' : 'blog';

  return <>
    {featured.map(value => <ContentCard key={`home-feature-${type}-${value.slug}`} type={type} frontmatter={value} />)}
  </>;
}

export default FeaturedPosts;
