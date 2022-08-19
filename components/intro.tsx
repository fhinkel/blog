import Link from 'next/link'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">
          <a className="hover:underline">Fhinkel</a>
        </Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Franziska Hinkelmann, Ph.D., Principal Engineering Manager at Microsoft. Node.js Technical 
        Steering Committee member. Former compiler engineer on Google’s Chrome V8 team. Pronouns she/they.
      </h4>
    </section>
  )
}

export default Intro
