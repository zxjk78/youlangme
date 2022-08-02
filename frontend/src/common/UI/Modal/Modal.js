import ReactDom from 'react-dom';

// style
import classes from './Modal.module.scss';
const Backdrop = (props) => {
  return <div className={props.backdropStyle} onClick={props.closeHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </>
  );
};

const portalElement = document.querySelector('#overlays');

const Modal = (props) => {
  const isBackDropClickClose = props.backdropClickClose || true;
  const isBackDropTransparent = props.backDropTransparent || false;

  const closeModal = () => {
    // 모달을 연 상위 컴포넌트에서 모달을 닫게 만듬
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
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
