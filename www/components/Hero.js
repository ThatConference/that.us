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
  padding-left: 42px;
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${({ theme }) => theme.colors.light};

  svg {
    margin: 7px;
    height: 30px;
    fill: ${({ theme }) => theme.colors.light};

    ${below.med`
      height: 20px;
    `};
  }

  p {
    margin: 0;
    line-height: 1.2;
  }
`;

const BannerHeader = styled.div`
  text-align: left;
  padding-left: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 7rem;
    margin: 0;
    line-height: 1.1;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light};
  }
  h2 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.light};
    padding-top: 5px;
  }
`;

const Hero = props => {
  console.log(props.imagePath);

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
          opacity: 0.5,
        }}
      />
      <HeroContainer>
        <BannerHeader fullHeight={props.fullHeight}>
          <h1>{props.heading}</h1>
          <h2>{props.subheading}</h2>
        </BannerHeader>
        {props.children}
      </HeroContainer>
    </HeroImage>
  )
};

export default Hero;
