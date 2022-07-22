import ReactDom from 'react-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from './modalSlice';
// style
import classes from './Modal.module.scss';
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeHandler} />;
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
  const isBackDropClickClose = useSelector(
    (state) => state.modal.backDropClickClose
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalActions.offModal());
  };

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop closeHandler={isBackDropClickClose ? closeModal : null} />,
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
