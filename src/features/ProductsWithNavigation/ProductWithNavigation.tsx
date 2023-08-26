import ListOfProductsWithNavigation from '../../widgets/ListOfProductsWithNavigation/ListOfProductsWithNavigation';
import Button from '../../shared/components/Button/Button';
import './_ProductWithNavigation.scss';

function clickNavigation() {
  console.log(1);
}

const ProductWithNavigation = () => {
  return (
    <>
      <ListOfProductsWithNavigation />
      <div className={'wrapper-pagination'}>
        <nav className='pagination'>
          <Button
            className={'icon-cart'}
            data={'<'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-cart active'}
            data={'1'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-cart'}
            data={'2'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-cart'}
            data={'3'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-cart'}
            data={'>'}
            onClick={clickNavigation}
          />
        </nav>
      </div>
    </>
  );
};

export default ProductWithNavigation;
