import Image from "next/image";
import Socials from "./Socials";
import avatar from "../../../public/avatar.png";
import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";
import { Boop } from "@components/Boop";
import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import { cachedReadFile } from "@/helpers/frontmatter.helper";

const HeroH1 = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
) => (
  <h1 className="text-5xl font-bold font-lato text-left" {...props}>
    {props.children}
  </h1>
);

const HeroP = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) => (
  <p className="text-base mt-xs-sm text-justify" {...props}>
    {props.children}
  </p>
);

const HeroA = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) => (
  <a
    className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 "
    {...props}
  ></a>
);

async function Hero() {
  const content = await cachedReadFile(
    process.cwd() + "/content/home/01_hero.mdx",
    "utf-8",
  );

  return (
    <>
      <section
        className="lg:py-sm px-sm py-md col-span-12"
        role="region"
        aria-label="welcome hero"
      >
        <MDXRemote
          source={content}
          components={{
            h1: HeroH1,
            p: HeroP,
            a: HeroA,
            Boop: Boop,
          }}
        />
      </section>
    </>
  );
}

export default Hero;
