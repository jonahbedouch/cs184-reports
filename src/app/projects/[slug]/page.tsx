import {
  cachedReadFile,
  getCachedFileLocation,
  getCachedSlugs,
  ProjectFrontmatter,
} from "@/helpers/frontmatter.helper";
import { Suspense } from "react";
import Contents from "@/components/Contents";
import { compilePageMdx } from "@/helpers/mdx.helper";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getCachedSlugs("projects");

  return posts.map((post) => ({
    slug: post,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  let { slug } = await params;
  let contentStr: string;
  try {
    const path = await getCachedFileLocation("projects", slug);
    if (path === null) {
      throw Error();
    }

    contentStr = await cachedReadFile(path, "utf-8");
  } catch {
    return notFound();
  }

  const { toc, content, frontmatter } =
    await compilePageMdx<ProjectFrontmatter>(contentStr, "/project-assets/");

  if (frontmatter.published === false) {
    return notFound();
  }
  let openGraph: Metadata["openGraph"] = {
    title: `${frontmatter.title} | CS184 Zen Group`,
    description: frontmatter.excerpt,
    url: `https://cs184-zen.vercel.app/projects/${slug}`,
    siteName: "CS184 Zen Group",
    locale: "en-US",
    type: "article",
  };
  let twitter: Metadata["twitter"] = {
    card: "summary",
    title: `${frontmatter.title} | CS184 Zen Group`,
    description: frontmatter.excerpt,
    creator: "@jonahbedouch",
  };
  if (frontmatter.thumbnail) {
    openGraph.images = [
      { url: `/project-assets/${frontmatter.slug}/${frontmatter.thumbnail}` },
    ];
    twitter.images = [
      `/project-assets/${frontmatter.slug}/${frontmatter.thumbnail}`,
    ];
  }

  return {
    metadataBase: new URL("https://bedouch.net"),
    title: frontmatter.title,
    description: frontmatter.excerpt,
    generator: "Next.js",
    authors: [{ name: "Jonah Bedouch" }, { name: "Brandon Wong" }],
    openGraph,
    twitter,
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let { slug } = await params;
  let contentStr: string;
  try {
    const path = await getCachedFileLocation("projects", slug);
    if (path === null) {
      throw Error();
    }

    contentStr = await cachedReadFile(path, "utf-8");
  } catch {
    return false;
  }

  const { toc, content, frontmatter } =
    await compilePageMdx<ProjectFrontmatter>(contentStr, "/project-assets/");
  const published = new Date(frontmatter.publishDate);

  return (
    <main className="w-full">
      <Suspense fallback={<></>}>
        <hgroup
          className="lg:py-sm px-sm mt-3xs-xl md:col-span-9 col-span-12"
          aria-labelledby={`section-${frontmatter.title}`}
        >
          <h1 className="text-2xl text-center font-semibold">
            {frontmatter.title}
          </h1>
          <p className="text-center">{frontmatter.author}</p>
          <span className="sr-only">
            Published on:{" "}
            {published.toLocaleDateString("en-us", {
              timeZone: "UTC",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <p className="text-center mb-5" aria-hidden={true}>
            {published.toLocaleDateString("en-us", {
              timeZone: "UTC",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-center">
            This report is available online at:{" "}
            <Link
              href={`/projects/${slug}`}
              className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 "
            >
              https://cs184-zen.vercel.app/projects/{slug}
            </Link>{" "}
            or in{" "}
            <Link
              href={`/assets/projects/${slug}/report.pdf`}
              className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 "
            >
              PDF form
            </Link>
            .
          </p>
          <p className="text-center">
            The GitHub repository for this project can be found at:{" "}
            <Link
              href={frontmatter.github}
              className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 "
            >
              {frontmatter.github}
            </Link>
            .
          </p>
          <p className="text-center">
            Other assignments can be found by{" "}
            <Link
              href={`/`}
              className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200 "
            >
              going home
            </Link>{" "}
            .
          </p>
        </hgroup>
        <div className="flex flex-row">
          <div
            className="lg:py-sm px-sm py-md mt-3xs-xl md:w-9/12 w-full md:mr-sm md:col-span-9 col-span-12"
            aria-labelledby={`section-${frontmatter.title}`}
          >
            {content}
          </div>
          <div className="md:block hidden mt-3xs-xl w-3/12 ml-sm md:col-span-9 col-span-12">
            <aside
              className="sticky top-10 flex flex-col h-min lg:py-sm px-sm py-md"
              aria-labelledby={`section-${frontmatter.title}`}
            >
              <Contents title={frontmatter.title} ast={toc} />
            </aside>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
