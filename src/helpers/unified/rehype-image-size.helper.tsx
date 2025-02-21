/**
 * rehype-image-size.tsx
 * Modified variant of: https://mmazzarolo.com/blog/2023-07-29-nextjs-mdx-image-size/
 *
 * Requires:
 * - npm i image-size unist-util-visit
 */
import getImageSize from "image-size";
import { visit } from "unist-util-visit";
import type { Element, Node, Parent, Root } from "hast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import * as fs from "fs";
import { getPlaiceholder } from "plaiceholder";
import type { VFile } from "vfile";
import { cacheBlurImage, Frontmatter } from "../frontmatter.helper";

type Options = {
    root: string;
}

/**
 * Analyze local MDX images and add `width` and `height` attributes to the
 * generated `img` elements.
 * Supports both markdown-style images and MDX <Image /> components.
 * @param {string} options.root - The root path when reading the image file.
 */
export const rehypeImageProcess = (options: Options) => {
    return async (tree: Root, file: VFile) => {
        // This matches all images that use the markdown standard format ![label](path).

        const promises: Promise<any>[] = [];

        visit(tree,
            (x): x is Element => (x.type === "element" && "tagName" in x && x.tagName === "img"),
            (node, idx, parent) => {
                if (node.properties.width || node.properties.height || parent === undefined || idx === undefined) {
                    return;
                }
                const imagePath = `${options?.root ?? ""}${node.properties.src}`;

                const imageSize = getImageSize(imagePath);
                node.properties.width = imageSize.width;
                node.properties.height = imageSize.height;


                let p = cacheBlurImage(imagePath).then(({ base64 }) => {
                    let newNode: any = {
                        type: 'element',
                        tagName: 'img',
                        properties: {
                            blurDataURL: base64,
                            ...node.properties
                        },
                        children: [],
                        position: node.position
                    }

                    parent.children.splice(idx, 1, newNode)
                });
                promises.push(p);
            }
        );
        // This matches all MDX' <Image /> components.
        // Feel free to update it if you're using a different component name.
        visit(tree,
            (x): x is MdxJsxFlowElement => (x.type === "mdxJsxFlowElement" && "name" in x && x.name === "Image`"),
            (x, idx, y) => {
                // For some reason, ts infers this as "never" unless the above validator casts to an "Element."
                // This code will not run unless we're working with an MdxJsxElement so we can safely cast it.
                let node = x as MdxJsxFlowElement;
                let parent = y as Parent;
                const srcAttr = node.attributes?.find((attr) => 'name' in attr && attr.name === "src");
                const imagePath = `${options?.root ?? ""}${srcAttr?.value}`;
                const imageSize = getImageSize(imagePath);
                const widthAttr = node.attributes?.find((attr) => 'name' in attr && attr.name === "width");
                const heightAttr = node.attributes?.find((attr) => 'name' in attr && attr.name === "height");
                if (widthAttr || heightAttr) {
                    // If `width` or `height` have already been set explicitly we don't want to override them.
                    return;
                }
                node.attributes.push({
                    type: "mdxJsxAttribute",
                    name: "width",
                    value: `${imageSize.width}`,
                });
                node.attributes.push({
                    type: "mdxJsxAttribute",
                    name: "height",
                    value: `${imageSize.height}`,
                });

                let p = cacheBlurImage(imagePath).then(({ base64 }) => {
                    console.log('w', node)
                    let newNode = {
                        ...node
                    };
                    newNode.attributes.push({
                        type: "mdxJsxAttribute",
                        name: "blurURL",
                        value: base64
                    });

                    //@ts-ignore
                    parent.children.splice(idx, 1, newNode);
                })
                promises.push(p);
            }
        );
        await Promise.all(promises);
        return null;
    };
};