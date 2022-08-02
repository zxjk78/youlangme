import React, { Component } from 'react';
import Slider from 'react-slick';
import './slick-theme.scss';
import './slick.scss';
import { API_URL } from '../../../../../utils/data/apiData';
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
          {this.state.pics.map((image, index) => {
            return (
              <div key={image}>
                <img
                  src={`${API_URL}image/board/${image}`}
                  alt={`게시물이미지${index}`}
                />
              </div>
            );
          })}

          {/* <div>
            <img
              src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
              alt=""
            />
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div> */}
        </Slider>
      </div>
    );
  }
}
