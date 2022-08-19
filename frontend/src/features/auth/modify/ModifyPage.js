import ModifyUserInfo from './ModifyUserInfo';
import styled from 'styled-components';

//bg image
import backImg from '../../../assets/youlangme_bg.jpg';

const Wrapper = styled.div`
  background-image: url(${backImg});
  background-size: cover;
  background-repeat: no-repeat;
  /* background-color: red; */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;

  align-items: center;

  & > div {
    margin-right: 100px;
  }
`;

const ModifyPage = () => {
  return (
    <>
      <Wrapper>
        <ModifyUserInfo />
      </Wrapper>
    </>
  );
};

export default ModifyPage;
