import {
  BlogFrontmatter,
  cacheBlurImage,
  cachedReadFile,
  ProjectFrontmatter,
} from "@/helpers/frontmatter.helper";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import * as Path from "path";
import { IconArrowUpRight } from "@tabler/icons-react";

type Props = {
  type: "blog" | "project";
  frontmatter: ProjectFrontmatter | BlogFrontmatter;
};

async function ContentCard(props: Props) {
  const pubdate = new Date(props.frontmatter.publishDate);
  let placeholder;
  if (props.frontmatter.thumbnail !== undefined) {
    const { base64 } = await cacheBlurImage(
      Path.resolve(
        `./public/${props.type}-assets/${props.frontmatter.slug}/${props.frontmatter.thumbnail}`,
      ),
    );
    placeholder = base64;
  }

  const path = props.type === "project" ? "projects" : "blog";

  return (
    <article className="">
      <Link
        href={`/${path}/${props.frontmatter.slug}`}
        className="rounded-lg bg-secondary-100 hover:bg-secondary-0 dark:base:bg-secondary-900 dark:bg-secondary-950 dark:base:hover:bg-secondary-1000 dark:hover:bg-secondary-1000 border border-secondary-700 dark:border-secondary-500 mt-4 mb-2 lg:pl-2 p-1 group flex flex-row relative h-40 w-full hover:shadow-low dark:hover:shadow-d-low transition-all duration-200"
      >
        <div className="flex-col flex-grow w-1">
          <span className="line-clamp-1 text-secondary-700 dark:text-secondary-400 group-hover:text-primary-800 dark:group-hover:text-primary-300">
            <span className="font-medium sm:mr-0 mr-auto">
              <span className="sr-only">Category: </span>
              {props.frontmatter.category}
            </span>
          </span>
          <h2 className="text-xl font-medium font-lato leading-tight">
            <span className="sr-only">Title: </span>
            {props.frontmatter.title}
          </h2>
          <span className="text-secondary-700 dark:text-secondary-400">
            <span className="sr-only">Published on: </span>
            {pubdate.toLocaleDateString("en-US", {
              timeZone: "UTC",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <p className="mt-1 line-clamp-2 w-full leading-tight">
            {props.frontmatter.excerpt}
          </p>
          <span className="absolute flex lg:left-2 left-1 bottom-1 text-primary-800 dark:text-primary-300 group-hover:font-medium underline decoration-transparent group-hover:decoration-primary-800 dark:group-hover:decoration-primary-300 transition-all duration-200">
            Read More{" "}
            <span
              className='relative overflow-hidden inline-block after:content-["\00A0"] after:absolute after:right-0 after:left-0 after:bottom-0 after:top-0 after:underline after:tracking-[1000px] after:decoration-transparent after:group-hover:decoration-primary-800 after:dark:group-hover:decoration-primary-300 after:transition-colors after:duration-200'
              aria-hidden
            >
              <IconArrowUpRight
                width={24}
                height={24}
                focusable={false}
                className="stroke-1 group-hover:stroke-[1.5] transition-all duration-200"
              />
            </span>
          </span>
        </div>
        {props.frontmatter.thumbnail !== undefined ? (
          <Image
            alt=""
            className="aspect-square object-cover grayscale-[25%] dark:grayscale-[35%] group-hover:grayscale-0 rounded-md sm:h-[9.4rem] sm:w-[9.4rem] ml-2  sm:block hidden"
            width={256}
            height={256}
            src={`/${props.type}-assets/${props.frontmatter.slug}/${props.frontmatter.thumbnail}`}
            placeholder="blur"
            blurDataURL={placeholder}
          ></Image>
        ) : (
          <></>
        )}
      </Link>
    </article>
  );
}

export function ContentCardFallback() {
  return (
    <article>
      <div className="animate-pulse rounded-lg bg-secondary-100 hover:bg-secondary-0 dark:base:bg-secondary-900 dark:bg-secondary-950 border border-secondary-700 dark:border-secondary-500 mt-4 mb-2 lg:pl-2 p-1 group flex flex-row relative h-40 w-full transition-all duration-200">
        <div className="flex-col flex-grow w-1 opacity-50 dark:opacity-25">
          <div className="w-1/3 h-3 my-1.5 mb-3 rounded-full bg-secondary-700 dark:bg-secondary-400"></div>
          <div className="w-2/3 h-5 my-1.5 rounded-full bg-text-light dark:bg-text-dark"></div>
          <div className="w-1/6 h-3 my-1.5 rounded-full bg-secondary-700 dark:bg-secondary-400"></div>

          <div className="w-[calc(100%-0.5rem)] h-3 mt-4 mb-1 rounded-full bg-text-light dark:bg-text-dark"></div>
          <div className="w-[calc(100%-0.5rem)] h-3 mt-1.5 mb-1 rounded-full bg-text-light dark:bg-text-dark"></div>
          <div className="absolute flex lg:left-2 left-1 bottom-1 bg-primary-800 dark:bg-primary-300 transition-all duration-200 w-[6.375rem] h-3 my-1.5 rounded-full"></div>
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
