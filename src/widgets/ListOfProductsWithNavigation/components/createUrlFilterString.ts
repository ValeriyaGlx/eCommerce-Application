import { Filters } from '../../../entities/Filtering/Filtering';

export function createFilterString(obj: Filters): string {
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

  return filters.join('&');
}
