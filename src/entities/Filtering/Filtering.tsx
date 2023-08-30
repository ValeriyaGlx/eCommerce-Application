import React, { useState } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './_Filtering.scss';
import { InputRadio } from '../../shared/components/InputRadio/InputRadio';
import {
  FILTERS_DIFFICULTY_DATA as difficultyArr,
  FILTERS_DURATION_DATA as durationArr,
} from '../../constants/filtersConstants/filtersConstants';
import Button from '../../shared/components/Button/Button';

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  priceMin: number;
  priceMax: number;
  difficulty: string;
  duration: string;
  search: string;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const initialFilters: Filters = {
    priceMin: 0,
    priceMax: 1000,
    difficulty: '',
    duration: '',
    search: '',
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className={'filtering_list'}>
      <h2 className={'filtering-title'}>Filter by</h2>
      <div className={'filtering_item'}>
        <label className={'filtering_item-title'}>Price</label>
        <Slider
          range
          min={0}
          max={500}
          defaultValue={[filters.priceMin, filters.priceMax]}
          onChange={(value: number[] | number) => {
            console.log(value);
            if (Array.isArray(value)) {
              const [priceMin, priceMax] = value;
              setFilters({ ...filters, priceMin, priceMax });
            }
          }}
        />
        <p className={'filtering_item-text'}>
          Price range: ${filters.priceMin} - ${filters.priceMax}
        </p>
      </div>
      <div className={'filtering_item'}>
        <h3 className={'filtering_item-title'}>Difficulty</h3>
        <InputRadio
          className={'wrapper-difficulty'}
          options={difficultyArr}
          onChange={(e) => {
            const newFilters = { ...filters, difficulty: e };
            console.log(newFilters);
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
        />
      </div>
      <div className={'filtering_item'}>
        <h3 className={'filtering_item-title'}>Duration</h3>
        <InputRadio
          className={'wrapper-duration'}
          options={durationArr}
          onChange={(e) => {
            const newFilters = { ...filters, duration: e };
            console.log(newFilters);
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
        />
      </div>
      <div className={'filtering_item'}>
        <h3 className={'filtering_item-title'}>Search</h3>
        <input
          type='text'
          value={filters.search}
          onChange={(e) => {
            const newFilters = { ...filters, search: e.target.value };
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
        />
      </div>
      <div className={'wrapper-button-reset'}>
        <Button
          className={'reset'}
          data={'Reset Filters'}
          onClick={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default Filter;
