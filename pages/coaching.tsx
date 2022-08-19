import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Intro from '../components/intro'
import CoverImage from '../components/cover-image'
import { InlineWidget } from "react-calendly";
import Subscribe from '../components/subscribe'

const coverImage = '/assets/blog/conferenceHeadshot.jpeg'

export default function About() {
  return (
    <>
      <Layout>
        <Head>
          <title>Career Coaching Franziska Hinkelmann, Ph.D.</title>
        </Head>
        <Container>
          <Intro />
          <section>
            <div className="mb-8 md:mb-16">
              <CoverImage title="Franziska Hinkelmann, Ph.D." src={coverImage} slug="" />
            </div>
          </section>

          <div className="max-w-2xl mx-auto">
            <div className="text-3xl mb-3 leading-snug">Career Coaching</div>
            <div className='my-4'>
              I provide one-on-one coaching to individuals looking for support, at any stage.
              As a career coach specializing in high tech and FAANG, my expertise includes backend
              software engineering, developer relations, Cloud development, and people management.
            </div>
            <div className='my-4'>
              We’ll meet whenever you need an outside perspective from an experienced engineering leader
              via video chat. Meeting with me is like having a one-on-one with a manager who cares deeply
              about you and your own growth. I'm here to give you feedback, advice, and most importantly,
              to help you to introspect and find the answers that are inside of you.
            </div>
            <div className='my-4'>
              Most often, I work with you to strategically and intentionally connect the dots between your
              career story and the companies and positions you are targeting in your job search. I’m also
              happy to help you brainstorm and edit your resume and job applications.
            </div>
            <div className="text-3xl mb-3 leading-snug">Book your session now</div>
            <div className=''>I'm offering free coaching sessions for women in tech.</div>
            <div className="App">
              <InlineWidget url="https://calendly.com/fhinkel" />
            </div>

            <div className="text-3xl mb-3 leading-snug">Wait list</div>
            <div className='my-4'>
              No time slot available that works for you? Join the wait list.
            </div>

            <div className="w-full md:w-9/12 md:max-w-full">
              <Subscribe m={`Get notified when new appointments are available. No spam.`}/>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}