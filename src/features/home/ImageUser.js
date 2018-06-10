import React, { Component } from 'react';
import PropTypes from 'prop-types';
import userDefaultImage from '../../images/user-default.png';

export default class ImageUser extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    return (
      <div className="home-image-user item-user">
        {this.props.user ? (
          <a className="user-link" href={this.props.user.profile_url} target="_blank" rel="noopener">
            <img className="user-avatar" src={this.props.user.avatar_url} alt=""/>
            <span>{this.props.user.display_name}</span>
          </a>
        ) : (
          <span className="user-link">
            <img className="user-avatar" src={userDefaultImage} alt="" />
            <span className="text-muted">N/A</span>
          </span>
        )}
      </div>
    );
  }
}
