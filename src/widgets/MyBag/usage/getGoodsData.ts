interface IOldArr {
  id: string;
  name: {
    'en-US': string;
  };
  variant: {
    images: Array<{
      url: string;
    }>;
  };
  price: {
    value: {
      centAmount: number;
    };
  };
}

export function getGoodsData(oldArr: Array<IOldArr>) {
  const newArr = oldArr.map((obj) => {
    const newObj = {
      id: obj.id,
      name: obj.name['en-US'],
      image: obj.variant.images[0].url,
      price: (obj.price.value.centAmount / 100).toFixed(2),
    };

    return newObj;
  });

  return newArr;
}
