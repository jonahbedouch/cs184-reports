import HomeSection from "@/components/HomeSection";
import { cachedReadFile } from "@/helpers/frontmatter.helper";
import Hero from "@components/Hero";
import { promises as fs } from "fs";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://cs184-zen.vercel.app"),
  title: "Home",
  description:
    "This is the homepage of Jonah Bedouch and Brandon Wong's CS184 group.",
  generator: "Next.js",
  keywords: [
    "frontend",
    "react",
    "computer science",
    "student",
    "berkeley",
    "eecs",
  ],
  authors: [{ name: "Jonah Bedouch" }, { name: "Brandon Wong" }],
  openGraph: {
    title: "CS184 Zen Group",
    description:
      "This is the homepage of Jonah Bedouch and Brandon Wong's CS184 group.",
    url: `https://cs184-zen.vercel.app`,
    siteName: "CS184 Zen Group",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `CS184 Zen Group`,
    description:
      "This is the homepage of Jonah Bedouch and Brandon Wong's CS184 group.",
    creator: "@jonahbedouch",
  },
};

export default async function Page() {
  const sections = await fs.readdir(process.cwd() + "/content/home/");

  const sectionContent: Record<string, string> = {};
  for (const section of sections) {
    sectionContent[section] = await cachedReadFile(
      process.cwd() + "/content/home/" + section,
      "utf-8",
    );
  }

  return (
    <main className="w-full grid grid-cols-12 md:gap-x-3xs-xl pt-3xs-xl">
      <Hero />
      {sections.map((section) => {
        if (section !== "hero.mdx") {
          return (
            <HomeSection
              content={sectionContent[section]}
              key={"homecontent-" + section}
            />
          );
        }
      })}
    </main>
  );
}
