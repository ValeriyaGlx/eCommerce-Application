import { createFilterString } from '../widgets/ListOfProductsWithNavigation/components/createUrlFilterString';

describe('createFilterString', () => {
  it('should generate the correct filter string when all filters are provided', () => {
    const obj = {
      priceMin: 10,
      priceMax: 50,
      difficulty: 'Intermediate',
      duration: '2 weeks',
      search: 'JavaScript',
      category: '123',
      sorting: 'By name A-Z',
    };

    const result = createFilterString(obj);

    expect(result).toBe(
      'filter=variants.price.centAmount:range("1000" to "5000")&' +
        'filter=variants.attributes.difficulty:"Intermediate"&' +
        'filter=variants.attributes.duration:range (0 to 3)&' +
        'text.en-US=JavaScript&' +
        'filter=categories.id:"123"&' +
        'sort=name.en-US asc',
    );
  });

  it('should generate the correct filter string when only some filters are provided', () => {
    const obj = {
      priceMin: 20,
      priceMax: 80,
      search: 'React',
      sorting: 'By price high to low',
      difficulty: '',
      duration: '',
      category: '',
    };

    const result = createFilterString(obj);

    expect(result).toBe(
      'filter=variants.price.centAmount:range("2000" to "8000")&' + 'text.en-US=React&' + 'sort=price desc',
    );
  });

  it('should generate an empty filter string when no filters are provided', () => {
    const obj = {
      priceMin: 0,
      priceMax: 500,
      difficulty: '',
      duration: '',
      search: '',
      category: '',
      sorting: '',
    };

    const result = createFilterString(obj);

    expect(result).toBe('filter=variants.price.centAmount:range("0" to "50000")');
  });
});
