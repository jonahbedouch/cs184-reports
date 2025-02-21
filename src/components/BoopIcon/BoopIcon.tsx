'use client'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion.hook';
import useRawBoop from '@/hooks/use-raw-boop.hook';
import { ReactElement } from 'react';

type Props = {
  base: ReactElement,
  boop: ReactElement,
  className?: string;
}

function BoopIcon({ base, boop, className }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [isBooped, trigger] = useRawBoop(250);

  return (
    <span className={`*:transition-all ${className} ${!reducedMotion && isBooped ? 'first:*:invisible first:*:opacity-0 last:*:visible last:*:opacity-100' : 'first:*:visible first:*:opacity-100 last:*:invisible last:*:opacity-0'} *:absolute *:top-0 *:left-0 *:right-0 *:bottom-0 *:w-full *:h-full`} aria-hidden={true} onMouseEnter={trigger}>
      {base}
      {boop}
    </span>
  )
}

export default BoopIcon;
