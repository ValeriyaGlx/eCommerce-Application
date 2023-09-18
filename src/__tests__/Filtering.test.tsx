import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Filter from '../entities/Filtering/Filtering';

const mockFilterChange = jest.fn();

describe('Filtering', () => {
  const setup = () => {
    const utils = render(
      <Filter
        className='test-filter'
        onFilterChange={mockFilterChange}
        onClickCloseButton={mockFilterChange}
      />,
    );
    const difficultyRadio = utils.getByText('Easy');
    const durationRadio = utils.getByText('Less 4 weeks');
    const searchInput = utils.getByRole('textbox', { name: '' });

    return {
      ...utils,
      difficultyRadio,
      durationRadio,
      searchInput,
    };
  };

  test('renders the Filter component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  test('handles Difficulty radio changes correctly', () => {
    const { difficultyRadio } = setup();
    fireEvent.click(difficultyRadio);

    expect(mockFilterChange).toHaveBeenCalledWith({
      priceMin: 0,
      priceMax: 500,
      difficulty: 'easy',
      duration: '',
      search: '',
    });
  });

  test('handles Duration radio changes correctly', () => {
    const { durationRadio } = setup();
    fireEvent.click(durationRadio);

    expect(mockFilterChange).toHaveBeenCalledWith({
      priceMin: 0,
      priceMax: 500,
      difficulty: '',
      duration: 'less 4 weeks',
      search: '',
    });
  });

  test('handles Search input changes correctly', () => {
    const { searchInput } = setup();
    fireEvent.change(searchInput, { target: { value: 'TestSearchValue' } });

    expect(mockFilterChange).toHaveBeenCalledWith({
      priceMin: 0,
      priceMax: 500,
      difficulty: '',
      duration: '',
      search: 'TestSearchValue',
    });
  });

  test('handles Reset Filters button click correctly', () => {
    const { getByText } = setup();
    const resetButton = getByText('Reset Filters');
    fireEvent.click(resetButton);

    expect(mockFilterChange).toHaveBeenCalledWith({
      priceMin: 0,
      priceMax: 500,
      difficulty: '',
      duration: '',
      search: '',
    });
  });
});
