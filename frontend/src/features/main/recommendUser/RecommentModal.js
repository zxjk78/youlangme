import Modal from '../../../common/UI/Modal/Modal';
import classes from './RecommentModal.module.scss';
import RecommendUserInfo from './RecommendUserInfo';
const RecommentModal = (props) => {
  const closeModal = () => {
    props.close();
  };

  return (
    <>
      <Modal>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>팔로우 추천</div>
              <div onClick={closeModal}>닫기</div>
            </div>
            <div className={classes.main}>
              {props.recommendList.map((reco) => (
                <RecommendUserInfo
                  id={reco.followerId}
                  name={reco.name}
                  nationality={reco.nationality}
                  key={reco.followerId}
                />
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RecommentModal;
