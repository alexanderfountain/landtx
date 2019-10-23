import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import fullscreen from "../../../images/Magnifier.png"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
import FullSlide from "../../fullslide"
import Img from "gatsby-image"
import { FaEnvelope } from "react-icons/fa"
import { ShareButton } from "react-custom-share"
const PropertyTopStyle = styled.div`
  background-color: #ddd9cb;
  .share {
    -webkit-appearance: none;
    border: 0px;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    padding: 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #40413d;
    background-color: transparent;
    svg {
      margin-right: 10px;
    }
  }
  .title-status {
    clear: both;
    h1 {
      width: calc(100% - 60px);
      display: inline;
      margin-right: 10px;
      color: #40413d;
    }
    .status {
      color: #40413d;
    }
  }
  .popclose-parent {
    filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
    z-index: 99999999999999;
    position: absolute;
    top: 40px;
    right: 40px;
  }
  .popclose {
    height: 60px !important;
    width: 60px !important;
    clip-path: polygon(
      20% 0%,
      0% 20%,
      30% 50%,
      0% 80%,
      20% 100%,
      50% 70%,
      80% 100%,
      100% 80%,
      70% 50%,
      100% 20%,
      80% 0%,
      50% 30%
    );
    background-color: white;
    cursor: pointer;
  }
  h1 {
    display: inline-block;
    margin-top: 0px;
  }
  .status {
    font-style: italic;
  }
  ul.details {
    padding: 0px;
    margin: 0px;
    margin-bottom: 40px;
    color: #40413d;
    li {
      list-style: none;
      margin-bottom: 10px;
      &.top-desc {
        font-family: Tinos;
        font-style: italic;
        font-weight: normal;
        font-size: 22.5px;
        margin-bottom: 25px;
      }
      a {
        color: #40413d;
        text-decoration: none;
      }
    }
  }
  .brown-cta-prop {
    color: white;
    padding: 15px 20px;
    text-decoration: none;
    display: block;
    background: ${variable.darkBrown};
    margin-bottom: 20px;
    text-align: center;
    border-radius: 5px;
  }
  .top-property-container {
    padding-top: 72px;
    padding-bottom: 72px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .top-details-left {
      width: 40%;
    }
    .top-details-right {
      width: calc(60% - 40px);
      position: relative;
    }
    .fullscreen {
      width: 35px;
      height: 35px;
      cursor: pointer;
      bottom: 30px;
      padding-left: 2px;
      left: 20px;
      position: absolute;
    }
    .indicators {
      position: relative;
      bottom: 45px;
    }
  }
  .popupbox-content div:not(.nav):not(.indicators) {
    height: 100%;
  }
  .popupbox-content {
    padding: 0px;
  }
  .alice-carousel__dots-item {
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.75);
    &.__active {
      background-color: rgba(255, 255, 255, 0.4) !important;
    }
  }
  .alice-carousel__dots-item:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  .alice-carousel__dots {
    bottom: 20px;
    margin: 0px;
  }
  .popupbox-content {
    .indicators {
      margin-top: 10px;
      height: 7px;
    }
  }

  @media (max-width: ${variable.tabletWidth}) {
    .top-property-container {
      padding-top: 50px;
      padding-bottom: 50px;
      .top-details-left {
        width: 50%;
      }
      .top-details-right {
        width: calc(50% - 20px);
        position: relative;
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .top-property-container {
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      .top-details-left {
        width: 100%;
      }
      .top-details-right {
        width: 100%;
        position: relative;
      }
    }
    .title-details {
      padding: 0px 15px;
    }
  }
`

class PropertyTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }

  openPopupbox(e, slideshow, title) {
    const content = (
      <div>
        <FullSlide slideshow={slideshow}></FullSlide>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={e => {
              this.closePopupbox(e)
            }}
          ></div>
        </div>
      </div>
    )
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {},
    })
  }
  closePopupbox(e) {
    PopupboxManager.close({
      fadeInSpeed: 10,
    })
  }
  render() {
    const { property, large } = this.props
    console.log(property)
    const shareButtonProps = {
      url: "https://landtx.netlify.com/property/" + property.slug.current,
      network: "Email",
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTopStyle>
        {/* <PopupboxContainer /> */}
        <Container className="top-property-container">
          <div className="top-details-left">
            <div className="title-details">
              <div className="title-status">
                <h1>{property.title}</h1>
              </div>
              <ul className="details">
                {property.description && (
                  <li className="top-desc">{property.description}</li>
                )}
                {property.acres && (
                  <li>
                    {property.acres} acres in {property.county} County
                  </li>
                )}
                {property.price && <li>{formatter.format(property.price)}</li>}
                {property.status && (
                  <li className="status">{property.status} Listing</li>
                )}
                {property.brochure && (
                  <li>
                    <a className="brochure" href={property.brochure.asset.url}>
                      Download Property Brochure
                    </a>
                  </li>
                )}
                <li>
                  <ShareButton {...shareButtonProps} className="share">
                    <FaEnvelope /> Share Listing
                  </ShareButton>
                </li>
              </ul>
            </div>
            {property.status == "Active" && (
              <div>
                <a className="brown-cta-prop" href="">
                  Request a Bound Package
                </a>
                <a className="brown-cta-prop" href="">
                  Ask About this Property
                </a>
              </div>
            )}
          </div>
          <div className="top-details-right">
            <AliceCarousel
              autoPlay
              mouseDragEnabled
              buttonsDisabled
              autoPlayInterval={5000}
              duration={1000}
            >
              {property.slideshow.map((slide, index) => (
                <Img fluid={slide.asset.fluid} className="prop-slide" />
              ))}
            </AliceCarousel>

            <img
              className="fullscreen"
              src={fullscreen}
              onClick={e => {
                this.openPopupbox(e, large.slideshow, property.title)
              }}
            ></img>
          </div>
        </Container>
      </PropertyTopStyle>
    )
  }
}

export default PropertyTop
