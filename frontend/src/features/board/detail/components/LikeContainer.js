import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const API_URL = 'http://127.0.0.1:8080/';

const container = {
  position: 'relative',

  display: 'flex',
  flexDirection: 'row',
  cursor: 'pointer',
};

const likeUserList = {
  width: '100px',
  padding: '8px',
  left: '100px',
  position: 'absolute',
  backgroundColor: '#fff',
  borderRadius: '15px',
};

const LikeContainer = (props) => {
  const [likeUserVisible, setLikeUserVisible] = useState(false);
  const dislikeHandler = () => {
    props.dislike();
  };
  const likeHandler = () => {
    props.like();
  };
  const showLikeUserModal = () => {
    // 생각해보니까 모달의 모달이 됨 - 인스타그램에서는 크게 신경 안쓰는거같은데
    // 모달 창이 아니라 조건부 렌더링으로 작성해야될듯...
    setLikeUserVisible((prevState) => !prevState);
  };
  return (
    <>
      <div style={container}>
        <div>
          {props.isLiked ? (
            <FavoriteIcon onClick={dislikeHandler} />
          ) : (
            <FavoriteBorderIcon onClick={likeHandler} />
          )}
        </div>
        <div onClick={showLikeUserModal}>{props.likeUsers.length}</div>
        {likeUserVisible && (
          <div style={likeUserList}>
            {props.likeUsers.map((user) => {
              return (
                <Link to={`/profile/${user.id}`}>
                  <div key={user.id}>
                    <img
                      src={`${API_URL}image/profile/${user.id}.jpg`}
                      alt=""
                    />
                    {user.name}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default LikeContainer;
