import React, { Component } from 'react';
import PropTypes from 'prop-types';
import userDefaultImage from '../../images/user-default.png';
import { Col, Row } from 'react-bootstrap';

export default class ImageList extends Component {
  static propTypes = {
    imageList: PropTypes.array,
  };

  render() {
    return (
      <div className="home-image-list">
        <Row className="image-list">
          {this.props.imageList.map((image, index) => (
            <Col key={index} xs={6} sm={4} md={3} className="image-item">
              <div className="item-content">
                <div className="item-img" style={{ backgroundImage: `url(${image.images.fixed_height_still.url})` }} />
                <div className="item-user">
                  {image.user ? (
                    <a className="user-link" href={image.user.profile_url} target="_blank" rel="noopener">
                      <img className="user-avatar" src={image.user.avatar_url} alt=""/>
                      <span>{image.user.display_name}</span>
                    </a>
                  ) : (
                    <span className="user-link">
                      <img className="user-avatar" src={userDefaultImage} alt="" />
                      <span className="text-muted">N/A</span>
                    </span>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
