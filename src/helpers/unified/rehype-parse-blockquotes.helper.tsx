import { visit } from "unist-util-visit";
import { h } from "hastscript";
import type { Node, Element, Root } from "hast";

export const rehypeParseBlockquotes = () => {
    return (ast: Root) => {
        visit(
            ast,
            (x): x is Element => 'tagName' in x && x.tagName === "blockquote",
            (node, idx, parent) => {
                if (parent === undefined || idx === undefined) { return; }
                const citation = parent.children[idx + 2];

                // Just wrap the blockquote in a figure if nothing is present. Give it a data tag so we can style it.
                if (parent.children.length < idx + 2 || citation.type !== "mdxJsxFlowElement" || citation.name !== "citation") {
                    parent.children[idx] = h("figure", { "data-blockquote": "" }, [
                        h("blockquote", node.properties, node.children)
                    ])
                    return;
                }

                // There is a <citation url=""></citation> attached. Work with that:
                let blockquote = h("blockquote", node.properties, node.children);
                let url = citation.attributes.find((attr) => 'name' in attr && attr.name === "url")
                if (url && typeof url.value === "string" && url.value !== "") {
                    blockquote.properties.cite = url.value;
                }

                parent.children[idx] = h("figure", { "data-blockquote": "" }, [
                    blockquote,
                    h("figcaption", { "data-blockquote-citation": "" }, citation.children)
                ])

                parent.children.splice(idx + 2, 2);

            }
        );
    };
};