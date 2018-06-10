import React from 'react';
import { shallow } from 'enzyme';
import { ImageUser } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageUser />);
  expect(renderedComponent.find('.home-image-user').length).toBe(1);
});
