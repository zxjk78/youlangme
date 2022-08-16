import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { newsActions } from './newsSlice';

import PostAddIcon from '@mui/icons-material/PostAdd';
import './NewsCard.scss';

class CardHeader extends React.Component {
  render() {
    const { image, topic } = this.props;

    return (
      <header id={image} className="card-header">
        <img src={image} alt={image} />
        {/* <h4 className="card-header--title">{topic}</h4> */}
      </header>
    );
  }
}

const Button = (props) => {
  const shareNews = () => {
    props.shareNews();
  };

  return (
    <button className="button button-primary" onClick={shareNews}>
      <PostAddIcon /> share
    </button>
  );
};

const CardBody = (props) => {
  const shareNews = () => {
    props.shareNews();
  };
  return (
    <div className="card-body">
      <h5>
        {props.title.length > 58
          ? props.title.slice(0, 55) + '...'
          : props.title}
      </h5>

      <p className="body-content">{props.text}</p>

      <Button shareNews={shareNews} />
    </div>
  );
};

const Card = (props) => {
  const article = props.article;
  const dispatch = useDispatch();
  const openOrigin = (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    props.openOrigin(article.url);
  };
  const shareNewsHandler = (event) => {
    // dispatch(newsActions.shareNews(article.url));
    props.shareNews([
      article.url,
      article.urlToImage,
      article.title,
      article.description,
    ]);
  };

  return (
    <article className="card" onClick={openOrigin}>
      <CardHeader image={article.urlToImage} />
      <CardBody
        title={article.title}
        text={article.description}
        shareNews={shareNewsHandler}
      />
    </article>
  );
};

export default Card;
