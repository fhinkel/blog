import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Intro from '../components/intro'
import CoverImage from '../components/cover-image'
import { HOME_OG_IMAGE_URL } from '../lib/constants'


const coverImage = '/assets/blog/conferenceHeadshot.jpeg'

export default function About() {
  return (
    <>
      <Layout>
        <Head>
          <title>Franziska Hinkelmann, Ph.D. | About </title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        </Head>
        <Container>
          <Intro />
          <section>
            <div className="mb-8 md:mb-16">
              <CoverImage title="Franziska Hinkelmann, Ph.D." src={coverImage} slug="" />
            </div>
          </section>

          <div className="max-w-2xl mx-auto">
            <div>
              I lead and mentor a 25 person, globally distributed, Developer Relations team
              at Microsoft in Cloud Advocacy.
              <br />
              <br />
              I have more than a decade of
              industry experience as a Software engineer with a strong open source focus. I'm a Node.js
              core contributor and elected member of the Node.js Technical Steering Committee.
              I was a compiler engineer
              on the Chrome V8 team, where I focused on performance
              improvements.
              <br />
              <br />
              As an engineer in Google Cloud Developer Relations, I keynoted multiple conferences
              and wrote several blog posts
              with more than 100K views. My focus was on Node.js performance and large scale tooling for
              documentation.
              <br />
              <br />
              Find me on {' '}
              <a target="_blank" href="https://github.com/fhinkel">
                <i className="fa-brands fa-github"></i>
              </a>
              , {' '}
              <a target="_blank" href="https://twitter.com/fhinkel">
                <i className="fa-brands fa-twitter"></i>
              </a>
              , {' '}
              <a target="_blank" href="https://www.linkedin.com/in/fhinkel/">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              , and {' '}
              <a target="_blank" href="https://medium.com/@fhinkel">
                <i className="fa-brands fa-medium"></i>
              </a>
              .
              <br></br>
              <br></br>

              <a href='https://www.youtube.com/playlist?list=PL65pp6Tpk690HkOh324FqtFYyxFVnEFEX' className='underline hover:text-blue-600 duration-200 transition-colors'>
                Youtube Playlist of my talks</a> and previous <a className='underline hover:text-blue-600 duration-200 transition-colors' href='https://medium.com/fhinkel/conference-talks-2017-3c0ed426406f'> speaking engagements</a>
               .
              <br></br>
              <br></br>

            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}