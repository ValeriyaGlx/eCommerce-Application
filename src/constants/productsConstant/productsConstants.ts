export const PRODUCTS_SORT_DATA = [
  {
    value: 'Price low to high',
    data: 'By price low to high',
    id: Math.random(),
  },
  {
    value: 'Price high to low',
    data: 'By price high to low',
    id: Math.random(),
  },
  {
    value: 'Name A-Z',
    data: 'By name A-Z',
    id: Math.random(),
  },
  {
    value: 'Name Z-A',
    data: 'By name Z-A',
    id: Math.random(),
  },
];

export interface IButtonNavigation {
  data: string;
  id: number;
  value: string;
}

export const CATEGORIES_OF_PRODUCTS: Array<IButtonNavigation> = [
  {
    data: 'All Categories',
    value: '',
    id: Math.random(),
  },
  {
    data: 'Free',
    value: 'free',
    id: Math.random(),
  },

  {
    data: 'Programming',
    value: 'programming',
    id: Math.random(),
  },

  {
    data: 'Data analysis',
    value: 'dataanalysis',
    id: Math.random(),
  },

  {
    data: 'Design',
    value: 'design',
    id: Math.random(),
  },

  {
    data: 'Management',
    value: 'management',
    id: Math.random(),
  },
];
