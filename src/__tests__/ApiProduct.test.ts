import { processDataAllProducts, IResponseAll, IProducts } from '../widgets/ListOfProductsWithNavigation/ApiProduct';

const mockData: Array<IResponseAll> = [
  {
    id: '1111',
    masterData: {
      current: {
        categories: [],
        name: {
          'en-US': 'JS course FREE',
        },
        description: {
          'en-US': 'Unlock the full potential of web development with our Comprehensive JavaScript course.',
        },
        categoryOrderHints: {},
        slug: {
          'en-US': 'js-course',
        },
        metaTitle: {
          'en-US': '',
        },
        metaDescription: {
          'en-US': '',
        },
        masterVariant: {
          id: 1,
          sku: 'JS course',
          key: 'js',
          prices: [
            {
              id: '662ffab6-bff5-4589-aea9-55638a09c2a5',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 10000,
                fractionDigits: 2,
              },
              key: 'js',
              country: 'US',
              discounted: {
                value: {
                  centAmount: 0,
                },
              },
            },
          ],
          images: [
            {
              url: 'https://rackcdn.jpg',
              dimensions: {
                w: 1074,
                h: 809,
              },
            },
          ],
          attributes: [
            {
              name: 'difficulty',
              value: ['easy'],
            },
            {
              name: 'duration',
              value: 2,
            },
          ],
          assets: [],
        },
        variants: [],
        searchKeywords: {},
      },
      staged: {
        masterVariant: {
          prices: [
            {
              id: '662ffab6-bff5-4589-aea9-55638a09c2a5',
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 10000,
                fractionDigits: 2,
              },
            },
          ],
          images: [
            {
              url: 'https://rackcdn.jpg',
            },
          ],
        },
      },
      published: true,
    },
    key: 'js-free',
  },
];

describe('processDataAllProducts', () => {
  it('must process the data correctly and return the expected result', () => {
    const expectedData: IProducts[] = [
      {
        id: 0.5,
        key: 'js-free',
        name: 'JS course FREE',
        description: 'Unlock the full potential of web development with our Comprehensive JavaScript course.',
        image: 'https://rackcdn.jpg',
        price: '100.00',
        duration: 2,
        difficulty: 'easy',
        discount: '0.00',
        productId: '1111',
      },
    ];
    const originalMathRandom = Math.random;
    Math.random = () => 0.5;
    const result = processDataAllProducts(mockData);
    Math.random = originalMathRandom;
    expect(result).toEqual(expectedData);
  });
});
