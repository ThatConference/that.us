import styled from 'styled-components';
import Icon from './Icon';
import { above, below } from '../utitlies/breakpoint.js';

const TreeImage = styled.img`
  width: 170px;

  ${below.med`
    width: 145px;
  `};
`;

const Trees = props => {
  return (
    <div>
      <a href="http://www.thatconference.com">
        <TreeImage src="../static/images/Logo-TC-Trees-Small.png" alt="THAT Conference" />
      </a>
    </div>
  )
}

export default styled(Trees)`
`;
