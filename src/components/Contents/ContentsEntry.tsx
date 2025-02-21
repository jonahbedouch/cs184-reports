import Link from 'next/link';
import * as React from 'react';

type Props = {
    href: string;
    value: string;
    active: boolean;
    depth: number;
}

function getPaddingFromDepth(depth: number): string {
    switch (depth) {
        case 2:
            return "";
        case 3:
            return "pl-2";
        case 4:
            return "pl-4";
        case 5:
            return "pl-6";
        case 6:
            return "pl-8";
        default:
            return "";
    }
}

function ContentsEntry(props: Props) {


    return <Link href={props.href} className={`truncate ${props.active ? 'text-primary-800 dark:text-primary-400' : 'text-secondary-600 hover:text-secondary-1000 dark:text-secondary-400 dark:hover:text-secondary-0'} ${getPaddingFromDepth(props.depth)}`}>{props.value}</Link>;
}

export default ContentsEntry;
