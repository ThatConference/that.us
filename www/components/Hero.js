import styled from 'styled-components';
import { ParallaxBanner } from 'react-scroll-parallax';
import {above, below} from '../utitlies/breakpoint.js';

const HeroImage = styled.div`
  height: ${({fullHeight}) => fullHeight ? '100vh' : '60vh'};
  max-width: 100%;
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.black};
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5% 5% 35px 5%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0,0,0,0.7);

  color: ${({ theme }) => theme.colors.light};

  svg {
    margin: 8px;
    height: 30px;
    fill: ${({ theme }) => theme.colors.light};

    ${below.med`
      height: 20px;
    `};

    ${below.small`
      margin: 2px 8px;
    `};
  }

  p {
    margin: 0;
    line-height: 1.2;
  }
`;

const BannerHeader = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;

  text-align: center;

  h1 {
    margin: 0;
    img {
      max-width: 60%;

      ${below.med`
        padding-top: 40px;
        max-width: 85%;
      `};

      ${below.small`
        padding-top: 20px;
      `};
    }
    
  }
  h2 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.light};
    padding-top: 5px;

    ${below.med`
      font-size: 2rem;
    `};
  }
`;

const Hero = props => {
  return(
    <HeroImage fullHeight={props.fullHeight} >
      <ParallaxBanner
        layers={[
          {
            image: props.imagePath,
            amount: 0.1,
          },
        ]}
        style={{
          height: props.fullHeight ? '100vh' : '60vh',
        }}
      />
      <HeroContainer>
        <BannerHeader fullHeight={props.fullHeight}>
          <h1>
            <img src="../static/images/that.us.horizontal.svg" alt="THAT.us" />
          </h1>
          <h2 dangerouslySetInnerHTML={{ __html: props.subheading }} />
        </BannerHeader>
        {props.children}
      </HeroContainer>
    </HeroImage>
  )
};

export default Hero;
