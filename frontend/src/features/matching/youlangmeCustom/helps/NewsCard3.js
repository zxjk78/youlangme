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
    // constructor에서 바인딩 해줘야 this로 사용가능
    this.openOrigin = this.openOrigin.bind(this);
  }

  openOrigin() {
    this.props.openOrigin(this.article.url);
  }
  render() {
    return (
      <article className="card" onClick={this.openOrigin}>
        <CardHeader image={this.article.urlToImage} />
        <CardBody title={this.article.title} text={this.article.description} />
      </article>
    );
  }
}
