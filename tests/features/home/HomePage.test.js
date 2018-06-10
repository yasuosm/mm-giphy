import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../../../src/features/home/HomePage';

describe('home/HomePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {
        fetchImageListPending: false,
        fetchImageListError: null,
        imageList: [],
        imageListPagination: { count: 0, offset: 0 },
      },
      actions: {},
    };
    const renderedComponent = shallow(
      <HomePage {...props} />
    );

    expect(
      renderedComponent.find('.home-home-page').length
    ).toBe(1);
  });
});
