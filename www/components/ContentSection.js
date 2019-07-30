import styled from 'styled-components';
import {above, below} from '../utitlies/breakpoint.js';

const Container = styled.div`
  /* width: 100vw; */
  padding: 40px 40px;
  margin: auto;
  max-width: 1100px;
`;

const DetailContainer = styled.div`
  margin: auto;
  display: flex;
  ${below.med`
    flex-direction: column;
    text-align: center;
    max-width: 700px;
  `};
  align-items: center;
`;

const ImageContainer = styled.div`
  order: ${({ align }) => align === 'left' ? 0 : 2};
  margin-left: ${({ align }) => align === 'left' ? 0 : '30px'};
  margin-right: ${({ align }) => align === 'left' ? '30px' : 0};
  position: relative;

  &:before {
    top: 5%;

    ${({ align }) => align === "left" && `
      right: 8%;
    `}

    ${({ align }) => align === "right" && `
      left: 8%;
    `}


    border: 3px solid ${({ theme }) => theme.colors.orange};
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeaturedImage = styled.img`
  object-fit: cover;
  width: auto;
  height: 200px;
  position: relative;

  ${below.med`
    width: 70%;
    height: auto;
  `};
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-top: 0;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
`;

const ContentSection = props => {
  return(
    <Container>
      <Title>{props.title}</Title>
      <DetailContainer>
        <ImageContainer align={ props.align }>
          <FeaturedImage src={props.image}/>
        </ImageContainer>
        <TextContainer>
          { props.description &&
            <Description>{props.description}</Description>
          }
          { props.children }
        </TextContainer>
      </DetailContainer>
    </Container>
  )
};

export default ContentSection;
