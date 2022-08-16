import ReactDom from 'react-dom';

// style
import classes from './Modal.module.scss';
const Backdrop = (props) => {
  return <div className={props.backdropStyle} onClick={props.closeHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <>
      <div
        className={`${classes.modal} ${
          props.isImageUpload && classes.imageUpload
        }        
        ${props.isBoardDetail && classes.boardDetail}
        ${props.isUserLike && classes.userLike}
        ${props.isFindPassword && classes.findPassword}
        `}
      >
        <div className={classes.content}>{props.children}</div>
      </div>
    </>
  );
};

const portalElement = document.querySelector('#overlays');

const Modal = (props) => {
  const isBackDropTransparent = props.backDropTransparent || false;
  // 백드롭이 투명하거나, 옵션에 클릭으로 삭제 못하게 만들어놨으면 click으로 지우기 안됨
  const isBackDropClickClose = isBackDropTransparent ? false : true;

  const closeModal = () => {
    // 모달을 연 상위 컴포넌트에서 모달을 닫게 만듬
    if (!isBackDropClickClose) {
      return;
    }

    props.closeModalHandler();
  };

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop
          backdropStyle={
            isBackDropTransparent ? classes.backdrop2 : classes.backdrop
          }
          closeHandler={isBackDropClickClose ? closeModal : null}
        />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          isImageUpload={props.imageUpload}
          isBoardDetail={props.boardDetail}
          isUserLike={props.userLike}
          isFindPassword={props.findPassword}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
