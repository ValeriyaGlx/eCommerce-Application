import React, { FC, useEffect, useState } from 'react';
import './_ProductDescription.scss';

import Like from '../../shared/components/Like/Like';
import {
  addProductToCart,
  idOfProductToCart,
} from '../../entities/ApiCart/addProductToCart';
import ShoppingCartButton from '../../shared/components/ShoppingCardButton/ShoppingCartButton';

interface ProductDescriptionProps {
  inner: string;
  description: string;
  discount: string;
  price: string;
  difficulty: string;
  duration: number;
  productId: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  inner,
  description,
  discount,
  price,
  difficulty,
  duration,
  productId,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idOfProducts = await idOfProductToCart();
        const isProductsToCart = idOfProducts.includes(productId);
        setIsButtonDisabled(isProductsToCart);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  async function clickCart(event: React.MouseEvent) {
    await addProductToCart(event, productId);
    setIsButtonDisabled(true);
  }

  return (
    <div className={'product-description'}>
      <div>
        <h2>{inner}</h2>
        <div className={'attrs-container'}>
          <span>{duration} weeks</span>
          <span
            className={`icon-difficulty icon-difficulty-${difficulty}`}
          ></span>
        </div>

        <p>{description}</p>
      </div>
      <div>
        <div className={'price-container'}>
          <div>
            {discount ? (
              <div className={'wrapper-prices'}>
                <span className={'new-price'}>${discount}</span>
                <span className={'old-price'}>${price}</span>
              </div>
            ) : (
              <span className={'price'}>${price}</span>
            )}
          </div>
          <Like />
        </div>
        <ShoppingCartButton
          isDisabled={isButtonDisabled}
          className={'buy-now-button'}
          data={'Buy Now'}
          onClick={(event) => clickCart(event)}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
