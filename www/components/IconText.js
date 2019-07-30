import styled from 'styled-components';
import Icon from './Icon';

const IconBlock = styled.div`
  display: flex;
  align-items: center;
`;

const IconText = props => {
  return(
    <IconBlock>
      <Icon icon={props.icon} />
      {props.children}
    </IconBlock>
  )
};

export default IconText;
