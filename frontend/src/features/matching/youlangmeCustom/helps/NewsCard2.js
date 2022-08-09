import React from 'react';
import './NewsCard2.scss';

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

class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    );
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <h5>{this.props.title}</h5>

        <p className="body-content">{this.props.text}</p>

        {/* <Button /> */}
      </div>
    );
  }
}

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.article = props.article;
  }

  render() {
    // console.log(this.article);
    return (
      <article className="card">
        <CardHeader image={this.article.media} topic={this.article.topic} />
        <CardBody title={this.article.title} text={this.article.summary} />
      </article>
    );
  }
}
