import React from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-slideshow-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import * as variable from "../components/variables"
import BackgroundImage from "gatsby-background-image"
import RawImage from "../components/rawImage"
import { Helmet } from "react-helmet"
import arrow from "../images/arrow.png"
import ScrollUpButton from "react-scroll-up-button"
import Scrollspy from "react-scrollspy"

const MainStyle = styled.div`
  .body {
    a {
      color: ${variable.steelBlue};
      &:hover {
        color: ${variable.marine};
      }
    }
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    overflow-y: scroll;
    align-self: flex-start;
    height: 600px;
    ul {
      padding: 0px;
      margin: 0px;
      li {
        list-style: none;
        a {
          color: ${variable.marine};
          margin-bottom: 8px;
          display: block;
          font-size: 17px;
        }
        &.is-current {
          a {
            color: ${variable.red};
          }
        }
      }
    }
  }
  .react-slideshow-container {
    position: relative;
    z-index: -1;
  }
  .slide {
    height: 550px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .body-container {
    display: flex;
    justify-content: space-between;
    padding-top: 70px;
    padding-bottom: 40px;
    .body {
      width: calc(60% - 40px);
      h1 {
        margin-top: 0px;
      }
    }
    .sidebar {
      width: 40%;
      .gatsby-image-wrapper {
        max-width: 265px;
        margin: 0 auto;
      }
      #properties-cta {
        a {
          width: 100%;
          margin-bottom: 50px;
          text-align: center;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          display: block;
          background: ${variable.steelBlue};
          &:after {
            content: "d";
            color: transparent;
            width: 15px;
            height: 15px;
            margin-left: 10px;
            background-image: url(${arrow});
            background-size: contain;
            background-repeat: no-repeat;
            display: inline-flex;
            align-items: center;
          }
        }
      }

      #contact {
        text-align: center;
        background-color: ${variable.taupe};
        padding: 40px 20px;
        img {
          width: 265px;
        }
        a {
          color: ${variable.red};
        }
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .slide {
      height: 450px;
    }
    .body-container {
      .body {
        width: calc(65% - 20px);
      }
      .sidebar {
        width: 35%;
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .slide {
      height: 300px;
    }
    .body-container {
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-top: 40px;
      .sidebar {
        margin: 40px 0px;
        .sticky {
          position: relative;
          top: unset;
          height: auto !important;
        }
      }
      .body {
        width: 100%;
        padding: 0px 15px;
      }

      .sidebar {
        width: 100%;
        #properties-cta {
          a {
            margin-bottom: 0px;
          }
          p {
            margin: 0px;
            padding: 0px;
          }
        }
      }
    }
  }
`

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    image: props => (
      // props.node.asset !== null && <div>{console.log(props.node.asset)}

      // </div>
      <div>
        <RawImage id={props.node.asset.id} />
      </div>
    ),
    blocks: props => (
      <div id={props.node.blockid && props.node.blockid}>
        <PortableText
          serializers={serializers}
          blocks={props.node.body}
          projectId="84iv1ine"
          dataset="production"
          imageOptions={{ w: 320, fit: "max" }}
        />
      </div>
    ),
  },
}

const properties = {
  duration: 7000,
  transitionDuration: 1500,
  infinite: true,
  indicators: false,
  arrows: false,
  // onChange: (oldIndex, newIndex) => {
  //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  // }
}

export const query = graphql`
  query MainPostByID($id: String!) {
    site: site {
      siteMetadata {
        title
        url
      }
    }
    main: allSanityMain(filter: { id: { eq: $id } }) {
      nodes {
        title
        slug {
          current
        }
        metadescription
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawSidebar(resolveReferences: { maxDepth: 10 })
        overview {
          title
          _key
        }
        _rawOverview
        slideshow {
          asset {
            url
            fluid(maxWidth: 1920) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`
class MainPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      this.state = {
        innerHeight: window.innerHeight - 100,
      }
    } else {
      this.state = {
        innerHeight: 600,
      }
    }
  }

  render() {
    const {
      title,
      slideshow,
      _rawBody,
      sidebarBody,
      metadescription,
      site,
      slug,
      rawoverview,
      overview,
    } = this.props

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {title} | {site.title}
          </title>
          <meta property="og:description" content={metadescription} />
          <link rel="canonical" href={site.url + "/" + slug} />
        </Helmet>
        <MainStyle>
          <Fade {...properties}>
            {slideshow.map((slide, index) => (
              <div className="each-slide">
                <BackgroundImage
                  className="slide"
                  fluid={slide.asset.fluid}
                ></BackgroundImage>
              </div>
            ))}
          </Fade>
          <Container className={slug + " body-container"}>
            <div className="body">
              <h1>{title}</h1>
              <PortableText
                serializers={serializers}
                blocks={_rawBody}
                projectId="84iv1ine"
                dataset="production"
              />
              {overview.map((overviewitem, index) => (
                <div>
                  <div key={index} id={overviewitem._key}>
                    <h2>{overviewitem.title}</h2>
                    <PortableText
                      serializers={serializers}
                      blocks={rawoverview[index].body}
                      projectId="84iv1ine"
                      dataset="production"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="sidebar">
              {console.log(this.props)}

              {rawoverview && (
                <div
                  className="sticky"
                  style={{ height: this.state.innerHeight }}
                >
                  {overview.map((overviewitem, index) => (
                    <Scrollspy
                      items={[overviewitem._key]}
                      currentClassName="is-current"
                      className="scrollspy"
                    >
                      <li key={index}>
                        <a key={index} href={"#" + overviewitem._key}>
                          {overviewitem.title}
                        </a>
                      </li>
                    </Scrollspy>
                  ))}
                </div>
              )}
              <PortableText
                serializers={serializers}
                blocks={sidebarBody}
                projectId="84iv1ine"
                dataset="production"
              />
            </div>
            <ScrollUpButton />
          </Container>
        </MainStyle>
      </Layout>
    )
  }
}
const Main = ({ data }) => {
  const { [0]: post } = data.main.nodes
  const { siteMetadata } = data.site
  return (
    <MainPostTemplate
      title={post.title}
      slideshow={post.slideshow}
      _rawBody={post._rawBody}
      overview={post.overview}
      rawoverview={post._rawOverview}
      sidebarBody={post._rawSidebar}
      metadescription={post.metadescription}
      site={siteMetadata}
      slug={post.slug.current}
    />
  )
}

export default Main
