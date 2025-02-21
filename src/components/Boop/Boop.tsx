'use client'
import React from 'react';
import { animated } from 'react-spring';
import useBoop, { BoopConfig } from '@hooks/use-boop.hook';

export function Boop({
    children,
    className,
    ...boopConfig
}: Partial<BoopConfig> & { className?: string, children: React.ReactNode }) {
    const [style, trigger] = useBoop(boopConfig);
    return (
        <animated.span onMouseEnter={trigger} style={style} className={className}>
            {children}
        </animated.span>
    );
};

export default Boop;