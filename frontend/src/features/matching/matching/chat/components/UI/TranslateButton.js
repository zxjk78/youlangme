import styled from 'styled-components';
import TranslateIcon from '@mui/icons-material/Translate';
const CustomButton = styled.button`
  background-color: purple !important;
  color: #fff !important;
  width: 30px !important;
  border: none;
  border-radius: 70%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TranslateButton = (props) => {
  const handleTranslateBtnClick = () => {
    props.btnClick();
  };
  return (
    <CustomButton size="small" onClick={handleTranslateBtnClick}>
      <TranslateIcon fontSize="small" />
    </CustomButton>
  );
};

export default TranslateButton;
