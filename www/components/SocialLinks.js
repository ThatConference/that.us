import styled from 'styled-components';
import Icon from './Icon';
import { above, below } from '../utitlies/breakpoint.js';

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: left;

  ${below.med`
    justify-content: center;
  `};

  a:hover {
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = props => {
  return(
    <SocialLinksContainer>
      <a href="https://www.facebook.com/groups/2257593914570023/">
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
