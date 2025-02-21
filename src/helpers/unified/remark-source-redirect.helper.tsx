/**
 * remark-assets-src-redirect.tsx
 * Modified variant of: https://mmazzarolo.com/blog/2023-07-30-nextjs-mdx-image-source/
 * 
 * Requires:
 * - npm i image-size unist-util-visit
 */
import { visit } from "unist-util-visit";
import type { Compatible, VFile } from "vfile";
import type { Node, Element, Root, Parent } from "hast";

type Options = {
    root: string;
}

/**
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
export const remarkSourceRedirect = (options: Options) => {
    return async (tree: Root, file: VFile) => {
        // You need to grab a reference of your post's slug.
        // I'm using Contentlayer (https://www.contentlayer.dev/), which makes it
        // available under `file.data`.But if you're using something different, you
        // should be able to access it under `file.path`, or pass it as a parameter
        // the the plugin `options`.
        if ('matter' in file.data === false || file.data.matter === undefined || file.data.matter === null || typeof file.data.matter !== "object") { return; }
        if ('slug' in file.data.matter === false) { return; }
        const slug = typeof file.data.matter.slug === 'string' ? file.data.matter.slug : '';

        if ('matter' in file.data && typeof file.data.matter === "object" && file.data.matter !== null && 'thumbnail' in file.data.matter && typeof file.data.matter.thumbnail === 'string') {
            file.data.matter.thumbnail = `${options.root}${slug}/${file.data.matter.thumbnail}`;
        }

        // This matches all images that use the markdown standard format ![label](path).
        visit(tree, "image", (node: Parent) => {
            // @ts-ignore
            node.url = `${options.root}${slug}/${node.url}`;
        });
        //     This matches all MDX' <Image /> components & source elements that I'm
        //     using within a custom <Video /> component.
        //     Feel free to update it if you're using a different component name.
        visit(tree, "mdxJsxFlowElement", (node) => {
            if (node.name === "Image" || node.name === 'source') {
                const srcAttr = node.attributes.find((attribute) => 'name' in attribute && attribute.name === "src");
                if (srcAttr !== undefined) {
                    srcAttr.value = `${options.root}${slug}/${srcAttr.value}`
                }
            }
        });
    }
}