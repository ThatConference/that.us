import styled from 'styled-components';
import Icon from './Icon';
import { above, below } from '../utitlies/breakpoint.js';

const TreeImage = styled.img`
  width: 130px;

  ${below.med`
    width: 105px;
  `};
`;

const Trees = props => {
  return (
    <div>
      <a href="http://www.thatconference.com">
        <TreeImage src="../static/images/ThatConference-Trees - Textured - White.svg" alt="THAT Conference" />
      </a>
    </div>
  )
}

export default styled(Trees)`
`;
