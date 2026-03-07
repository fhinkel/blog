import markdownStyles from './markdown-styles.module.css'
import Script from 'next/script'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </div>
  )
}

export default PostBody
