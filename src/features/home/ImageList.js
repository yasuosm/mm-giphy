import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Modal, Row } from 'react-bootstrap';
import ImageUser from './ImageUser';

export default class ImageList extends Component {
  static propTypes = {
    imageList: PropTypes.array,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showingIndex: null,
    };
    this.handleShowDetail = this.handleShowDetail.bind(this);
    this.handleCloseDetail = this.handleCloseDetail.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }

  handleCloseDetail() {
    this.setState({
      showingIndex: null,
    });
  }

  handleShowDetail(index) {
    this.setState({
      showingIndex: index,
    });
  }

  handleClickNext() {
    if (this.state.showingIndex < this.props.imageList.length - 1) {
      this.setState({
        updatingIndex: true, // for image src update
      }, () => {
        this.setState(prevState => ({
          updatingIndex: false,
          showingIndex: prevState.showingIndex + 1,
        }));
      });
    }
  }

  handleClickPrev() {
    if (this.state.showingIndex > 0) {
      this.setState({
        updatingIndex: true, // for image src update
      }, () => {
        this.setState(prevState => ({
          updatingIndex: false,
          showingIndex: prevState.showingIndex - 1,
        }));
      });
    }
  }

  render() {
    const showingImage = this.props.imageList[this.state.showingIndex];
    return (
      <div className="home-image-list">
        <Row className="image-list">
          {this.props.imageList.map((image, index) => (
            <Col key={index} xs={6} sm={4} md={3} className="image-item">
              <div className="item-content">
                <div
                  className="item-img"
                  style={{ backgroundImage: `url(${image.images.fixed_height_still.url})` }}
                  onClick={() => {this.handleShowDetail(index)}}
                />
                <ImageUser user={image.user} />
              </div>
            </Col>
          ))}
        </Row>
        <Modal
          show={this.state.showingIndex != null}
          onHide={this.handleCloseDetail}
          animation={false}
          bsSize="large"
          dialogClassName="image-detail-modal"
        >
          {showingImage &&
          <Modal.Body>
            <i className="glyphicon glyphicon-remove btn-close" onClick={this.handleCloseDetail} />
            {!this.state.updatingIndex &&
            <img className="item-img" src={showingImage.images.original.url} alt=""/>
            }
            <div className="item-info">
              <h2 className="item-title">{showingImage.title}</h2>
              <ImageUser user={showingImage.user} />
            </div>
            <i className="glyphicon glyphicon-chevron-right btn-next" onClick={this.handleClickNext} />
            <i className="glyphicon glyphicon-chevron-left btn-prev" onClick={this.handleClickPrev} />
          </Modal.Body>
          }
        </Modal>
      </div>
    );
  }
}
