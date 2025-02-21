'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import useWindowDimensions from "@hooks/use-window-dimensions.hook";
import { CloseButton, Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
// import { IconMenu2, IconX } from "@tabler/icons-react";

export function NavContent() {
    const pathname = usePathname();
    const markerRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLAnchorElement>(null);
    const projectsRef = useRef<HTMLAnchorElement>(null);
    const blogRef = useRef<HTMLAnchorElement>(null);
    const { width, height } = useWindowDimensions();

    const selected = useMemo(() => {
        if (pathname.includes("/projects/") || pathname.endsWith("projects")) {
            return ["projects", pathname === "/projects"]
        } else if (pathname.includes("/blog/") || pathname.endsWith("blog")) {
            return ["blog", pathname === "/blog"]
        } else if (pathname == "" || pathname == "/") {
            return ["home", true]
        } else {
            return "none"
        }
    }, [pathname])

    useEffect(() => {
        resetIndicator();
    }, [pathname, width]);

    const indicator = (event: MouseEvent) => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')

        if (!media.matches) {
            const marker = markerRef.current;
            if (marker === null) { return }

            marker.classList.add("transition-all", "duration-500")
            const target = event.target as HTMLAnchorElement
            if (target === null) { return }

            marker.style.left = target.offsetLeft + "px";
            marker.style.width = target.offsetWidth + "px";
        }

    };

    const resetIndicator = () => {
        const marker = markerRef.current;
        const home = homeRef.current;
        const projects = projectsRef.current;
        const blog = blogRef.current;
        if (marker === null || home === null || projects === null || blog === null) { return }

        let selectedRef: HTMLAnchorElement | undefined = undefined;

        switch (selected[0]) {
            case "home":
                selectedRef = home;
                break;
            case "blog":
                selectedRef = blog;
                break;
            case "projects":
                selectedRef = projects;
                break;
        }

        if (selectedRef == undefined) {
            marker.style.width = "0px";
        }
        else {
            marker.style.width = selectedRef.offsetWidth + "px";
            marker.style.left = selectedRef.offsetLeft + "px";
        }
    }

    return (
        <nav role="navigation" aria-label="main site navigation" className="flex relative">
            <div
                ref={markerRef}
                className="absolute left-0 h-full w-0 bg-primary-400 dark:bg-primary-800 rounded-md -z-10 motion-reduce:transition-none"
                aria-hidden={true}
            ></div>
            <Link
                ref={homeRef}
                href="/"
                onMouseEnter={indicator}
                onMouseLeave={resetIndicator}
                aria-current={selected[0] === "home" ? "page" : "false"}
                className={`text-lg font-normal px-2xs py-3xs mx-3xs rounded-md hover:font-medium transition-colors motion-reduce:transition-none ${selected[0] == 'home' ? '' : 'motion-reduce:hover:underline'}`}
            >
                Home
            </Link>
            <Link
                ref={projectsRef}
                href="/projects"
                onMouseEnter={indicator}
                onMouseLeave={resetIndicator}
                aria-current={selected[0] === "projects" ? "page" : "false"}
                className={`text-lg font-normal px-2xs py-3xs mx-3xs rounded-md hover:font-medium transition-colors motion-reduce:transition-none ${selected[0] == 'projects' ? '' : 'motion-reduce:hover:underline'}`}
            >
                Projects
            </Link>
            <Link
                ref={blogRef}
                href="/blog"
                onMouseEnter={indicator}
                onMouseLeave={resetIndicator}
                aria-current={selected[0] === "blog" ? "page" : "false"}
                className={`text-lg font-normal px-2xs py-3xs mx-3xs rounded-md hover:font-medium transition-colors motion-reduce:transition-none ${selected[0] == 'blog' ? '' : 'motion-reduce:hover:underline'}`}
            >
                Blog
            </Link>
        </nav >
    )
}