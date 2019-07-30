import styled from 'styled-components';
import Icon from './Icon';

const SocialLinksContainer = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: left;

  a:hover {
    svg {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }
`;

const SocialLinks = props => {
  return(
    <SocialLinksContainer>
      <a href="https://www.facebook.com/ThatConference/">
        <Icon icon="facebook" />
      </a>
      <a href="https://www.instagram.com/thatconference/">
        <Icon icon="instagram" />
      </a>
      <a href="https://twitter.com/ThatConference">
        <Icon icon="twitter" />
      </a>
    </SocialLinksContainer>
  )
}

export default styled(SocialLinks)`
`;
