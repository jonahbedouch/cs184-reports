import { compileHomeMDX } from "@/helpers/mdx.helper";
import { compileMDX } from "next-mdx-remote/rsc";
import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";

type Props = {
  content: string;
};

async function HomeSection(props: Props) {
  const label = props.content.split("# ")[1].split("\n")[0].toLowerCase();
  const { content, frontmatter } = await compileHomeMDX(props.content);

  if (frontmatter.published) {
    return (
      <section
        className="lg:py-sm px-sm py-md mt-3xs-2xs col-span-12 overflow-hidden"
        aria-labelledby={label}
      >
        {content}
      </section>
    );
  }

  return false;
}

export default HomeSection;
