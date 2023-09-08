import { AllFilters } from '../ListOfProductsWithNavigation';

export function createFilterString(obj: AllFilters): string {
  const filters: string[] = [];

  const priceFilter = `filter=variants.price.centAmount:range("${obj.priceMin * 100}" to "${obj.priceMax * 100}")`;
  filters.push(priceFilter);

  if (obj.difficulty !== undefined && obj.difficulty !== '') {
    const difficultyFilter = `filter=variants.attributes.difficulty:"${obj.difficulty}"`;
    filters.push(difficultyFilter);
  }

  if (obj.duration !== undefined && obj.duration !== '') {
    let duration = 'filter=variants.attributes.duration:range (0 to 3)';
    if (obj.duration === '4 or more weeks') {
      duration = 'filter=variants.attributes.duration:range (4 to 100)';
    }
    filters.push(duration);
  }

  if (obj.search !== undefined && obj.search !== '') {
    const searchFilter = `text.en-US=${obj.search}`;
    filters.push(searchFilter);
  }

  if (obj.category !== undefined && obj.category !== '') {
    const searchFilter = `filter=categories.id:"${obj.category}"`;
    filters.push(searchFilter);
  }

  if (obj.sorting !== undefined && obj.sorting !== '') {
    let direction = '';
    switch (obj.sorting) {
      case 'By price low to high':
        direction = 'price asc';
        break;
      case 'By price high to low':
        direction = 'price desc';
        break;
      case 'By name A-Z':
        direction = 'name.en-US asc';
        break;
      case 'By name Z-A':
        direction = 'name.en-US desc';
        break;
    }
    const searchSorting = `sort=${direction}`;
    filters.push(searchSorting);
  }

  return filters.join('&');
}
