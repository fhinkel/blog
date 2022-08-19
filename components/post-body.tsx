import markdownStyles from './markdown-styles.module.css'
import Subscribe from './subscribe'

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
      <div className="w-full md:w-9/12 md:max-w-full mx-auto mt-16">
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <div>Subscribe to the newsletter</div>
          <Subscribe m={`I'll only send emails when new content is posted. No spam.`} />
        </div>
      </div>
    </div>
  )
}

export default PostBody
