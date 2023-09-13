import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Like from '../shared/components/Like/Like';

test('Like component toggles the like state when clicked', () => {
  const { getByAltText } = render(<Like />);
  const likeImage = getByAltText('like');

  expect(likeImage.getAttribute('src')).toContain('icon-heart-line.svg');

  fireEvent.click(likeImage);

  expect(likeImage.getAttribute('src')).toContain('icon-heart-black.svg');

  fireEvent.click(likeImage);

  expect(likeImage.getAttribute('src')).toContain('icon-heart-line.svg');
});
