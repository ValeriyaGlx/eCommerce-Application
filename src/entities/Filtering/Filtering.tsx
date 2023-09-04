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
import search from '../../assets/icons/search-line.svg';

interface FilterProps {
  className: string;
  onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  priceMin: number;
  priceMax: number;
  difficulty: string;
  duration: string;
  search: string;
}

const initialFilters: Filters = {
  priceMin: 0,
  priceMax: 500,
  difficulty: '',
  duration: '',
  search: '',
};
const Filter: React.FC<FilterProps> = ({ className, onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedDifficultyValue, setSelectedDifficultyValue] =
    useState<string>('');
  const [selectedDurationValue, setSelectedDurationValue] =
    useState<string>('');

  const handleResetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
    setSelectedDifficultyValue('');
    setSelectedDurationValue('');
  };

  return (
    <div className={className}>
      <h2 className={'filtering-title'}>Filter by</h2>
      <div className={'filtering_item'}>
        <label className={'filtering_item-title'}>Price</label>
        <Slider
          range
          min={0}
          max={500}
          value={[filters.priceMin, filters.priceMax]}
          onChange={(value: number[] | number) => {
            if (Array.isArray(value)) {
              const [priceMin, priceMax] = value;
              const newFilters = { ...filters, priceMin, priceMax };
              setFilters(newFilters);
            }
          }}
          onAfterChange={(value: number[] | number) => {
            if (Array.isArray(value)) {
              const [priceMin, priceMax] = value;
              const newFilters = { ...filters, priceMin, priceMax };
              onFilterChange(newFilters);
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
          selectedValue={selectedDifficultyValue}
          name={'difficulty'}
          className={'wrapper-difficulty'}
          options={difficultyArr}
          onChange={(e) => {
            const newFilters = { ...filters, difficulty: e };
            setFilters(newFilters);
            onFilterChange(newFilters);
            setSelectedDifficultyValue(e);
          }}
        />
      </div>
      <div className={'filtering_item'}>
        <h3 className={'filtering_item-title'}>Duration</h3>
        <InputRadio
          selectedValue={selectedDurationValue}
          name={'duration'}
          className={'wrapper-duration'}
          options={durationArr}
          onChange={(e) => {
            const newFilters = { ...filters, duration: e };
            setFilters(newFilters);
            onFilterChange(newFilters);
            setSelectedDurationValue(e);
          }}
        />
      </div>
      <div className={'filtering_item'}>
        <h3 className={'filtering_item-title'}>Search</h3>
        <div className={'filtering_item-inner'}>
          <img className={'filtering_item-img'} src={search} alt='icon' />
          <input
            type='text'
            className={'item-search'}
            value={filters.search}
            onChange={(e) => {
              const newFilters = { ...filters, search: e.target.value };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
          />
        </div>
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
