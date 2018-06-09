import React from 'react';
import { shallow } from 'enzyme';
import { ImageList } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageList />);
  expect(renderedComponent.find('.home-image-list').length).toBe(1);
});
