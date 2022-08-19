import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeFigure from 'rehype-figure'
import remarkPrism from "remark-prism";



export default async function markdownToHtml(markdown: string) {
  let result = await remark()
    .use(remarkPrism)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFigure, { className: "my-figure" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  return result.toString()
}
