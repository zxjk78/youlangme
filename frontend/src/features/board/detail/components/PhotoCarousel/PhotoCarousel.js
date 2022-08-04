import React, { Component } from 'react';
import Slider from 'react-slick';
import './slick-theme.scss';
import './slick.scss';
import { API_URL } from '../../../../../common/api/http-config';
export default class FocusOnSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { pics: props.pics };
  }

  render() {
    const settings = {
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.pics.map((image, index) => {
            return (
              <div key={image}>
                <img
                  src={`${API_URL}image/board/${image}`}
                  alt={`게시물이미지${index}`}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
