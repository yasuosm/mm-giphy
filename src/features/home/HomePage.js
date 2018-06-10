import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchImageList, dismissFetchImageListError } from './redux/actions';
import ImageList from './ImageList';
import InfiniteScroll from 'react-infinite-scroller';

export class HomePage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleLoadMore() {
    const { imageListPagination } = this.props.home;
    const offset = imageListPagination.offset + imageListPagination.count;
    this.props.actions.fetchImageList(offset);
  }

  hasMore() {
    const { fetchImageListPending, fetchImageListError, imageListPagination } = this.props.home;
    if (fetchImageListPending || fetchImageListError) {
      return false;
    }
    return imageListPagination.total_count == null || imageListPagination.offset + imageListPagination.count < imageListPagination.total_count;
  }

  render() {
    const { fetchImageListPending, fetchImageListError, imageList } = this.props.home;
    return (
      <div className="home-home-page">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleLoadMore.bind(this)}
          hasMore={this.hasMore()}
        >
          <ImageList imageList={imageList} />
        </InfiniteScroll>
        {fetchImageListPending &&
        <div className="text-center"><div className="loader" /></div>
        }
        {fetchImageListError &&
        <div className="text-center error">An error occurred. <a onClick={this.props.actions.dismissFetchImageListError}>Try again</a></div>
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchImageList, dismissFetchImageListError }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
