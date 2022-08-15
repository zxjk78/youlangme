import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';

const CustomButton = styled(Button)`
  background-color: purple !important;
  border-radius: 15px !important;
  color: #fff !important;
  width: 90px;
  height: 40px;
  line-height: 10px;
`;

const SendButton = (props) => {
  const handleSendBtnClick = () => {
    props.btnClick();
  };
  return (
    <CustomButton
      size="small"
      endIcon={<SendIcon />}
      onClick={handleSendBtnClick}
    >
      Send
    </CustomButton>
  );
};

export default SendButton;
