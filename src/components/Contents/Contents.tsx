'use client'

import { Ref, useEffect, useRef, useState } from "react";
import ContentsEntry from "./ContentsEntry";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

type Props = {
  title: string;
  ast: { value: string, href: string, depth: number, numbering: number[], parent: string }[];
}

function Contents(props: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [titleVisible, setTitleVisible] = useState<boolean>(false);
  const [ranges, setRanges] = useState<number[]>([]);
  const [headings, setHeadings] = useState<string[]>([]);

  const { scrollY } = useScroll()
  useEffect(() => {
    let lrange: number[] = []
    let lhead: string[] = []
    props.ast.map(ev => {
      let doc = document.getElementById(ev.href.substring(1));
      if (doc) {
        lrange.push(doc.getBoundingClientRect().top + window.scrollY - 5);
        lhead.push(ev.href);
      }
    })

    setRanges(lrange);
    setHeadings(lhead);
  }, []);

  useMotionValueEvent(scrollY, 'change', y => {
    if (ranges.length === 0) { return; }
    if (y <= ranges[0]) { setActiveSection(headings[0]); setTitleVisible(false); return; }

    setTitleVisible(true);

    if (y >= ranges[ranges.length - 1]) { setActiveSection(headings[headings.length - 1]); return; }

    for (let i = 0; i < ranges.length - 1; i++) {
      if (y >= ranges[i] && y < ranges[i + 1] && headings.length >= i) {
        setActiveSection(headings[i]);
      }
    }

  })

  return <div className="flex flex-col">
    <span className={`${titleVisible ? 'visible text-lg opacity-100' : 'text-[0px] opacity-0'} font-medium truncate transition-all`} aria-hidden={!titleVisible}>{props.title}</span>
    <span className="mb-1 font-medium">Table of Contents</span>
    {props.ast.map((ev, idx) => <ContentsEntry key={`${props.title}-${idx}-${ev.depth}`} href={ev.href} value={ev.value} depth={ev.depth} active={activeSection === ev.href} />)}
  </div>;
}

export default Contents;
