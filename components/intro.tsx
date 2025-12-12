import Link from 'next/link'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/" className="hover:underline">
          Fhinkel
        </Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Engineering Manager at Google. Node.js Technical Steering Committee member. Former director at Microsoft and compiler engineer on Google’s Chrome V8 team.
      </h4>
    </section>
  );
}

export default Intro
