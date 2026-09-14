import Link from 'next/link';
import './PopularProducts.css';

const PopularProducts = () => {
  return (
    <div className="products-container">
      <Link href="/products/category/api-impurity-standards" className="product-item">
        <img src='sq1.jpeg' alt="Popular product 1" />
        <div className="product-label">Api Impurity Standards</div>
      </Link>
      
      <Link href="/products/category/reagents" className="product-item">
        <img src='sq2.jpeg' alt="Popular product 2" />
        <div className="product-label">Reagents</div>
      </Link>
      
      <Link href="/products/category/building-blocks" className="product-item">
        <img src='sq3.jpeg' alt="Popular product 3" />
        <div className="product-label">Building Blocks</div>
      </Link>
    </div>
  );
};

export default PopularProducts;
