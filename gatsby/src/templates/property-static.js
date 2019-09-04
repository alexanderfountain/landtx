import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import * as variable from "../components/variables"
import PropertyTop from "../components/entity/property/property-top"
import Tabs from "../components/tabs"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

const PropertyStaticStyle = styled.div`
  .alice-carousel__prev-btn {
    position: absolute;
    width: 40px;
    top: 20px;
    right: 80px;
    .alice-carousel__prev-btn-item {
      color: white;
    }
  }
  .alice-carousel__next-btn {
    position: absolute;
    width: 40px;
    top: 20px;
    right: 20px;
    .alice-carousel__next-btn-item {
      color: white;
    }
  }
  .prop-brown-container {
    background-color: ${variable.taupe};
    padding-bottom: 40px;
  }
  .static-slide {
    h3 {
      background-color: ${variable.rosyBrown};
      padding: 15px;
      color: white;
      margin-bottom: 0px;
      margin-top: 40px;
    }
  }
`

export const query = graphql`
  query PropertyPostStaticByID($id: String!) {
    allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        slug {
          current
        }
        title
        acres
        county
        price
        status
        brochure {
          asset {
            url
          }
        }
        _rawSidebar(resolveReferences: { maxDepth: 10 })
        interactivemap
        staticmaps {
          image {
            asset {
              url
            }
          }
          caption
        }
        slideshow {
          asset {
            url
          }
        }
        overview {
          title
          _key
        }
        _rawOverview
      }
    }
  }
`

class PropertyPostStaticTemplate extends React.Component {
  render() {
    const { property, staticmaps } = this.props
    console.log(staticmaps)
    return (
      <Layout>
        <PropertyStaticStyle>
          <PropertyTop property={property}></PropertyTop>
          <Tabs property={property} active="tab-container-static"></Tabs>
          <div className="prop-brown-container">
            <Container className="static">
              <AliceCarousel mouseDragEnabled dotsDisabled>
                {staticmaps.map((slide, index) => (
                  <div className="static-slide">
                    {console.log(slide)}
                    <h3>{slide.caption}</h3>
                    <img
                      src={slide.image.asset.url + "?w=1200"}
                      className="prop-slide"
                    />
                  </div>
                ))}
              </AliceCarousel>
            </Container>
          </div>
        </PropertyStaticStyle>
      </Layout>
    )
  }
}
const PropertyStatic = ({ data }) => {
  const { [0]: post } = data.allSanityProperty.nodes
  return (
    <PropertyPostStaticTemplate
      overview={post.overview}
      rawoverview={post._rawOverview}
      slideshow={post.slideshow}
      _rawSidebar={post._rawSidebar}
      interactivemap={post.interactivemap}
      staticmaps={post.staticmaps}
      property={post}
    />
  )
}

export default PropertyStatic
