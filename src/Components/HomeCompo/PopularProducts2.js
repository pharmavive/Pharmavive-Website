import Link from 'next/link';
import './PopularProducts.css';

const PopularProducts = () => {
  return (
    <div className="products-container">
      <Link href="/products/category/nitrosamines" className="product-item">
        <img src='sq4.jpeg' alt="Popular product 4" />
        <div className="product-label">Nitrosamines</div>
      </Link>
      
      <Link href="/products/category/peptide-coupling-reagents" className="product-item">
        <img src='sq5.jpeg' alt="Popular product 5" />
        <div className="product-label">Peptide Coupling Reagents</div>
      </Link>

      <Link href="/products/category/cdmo" className="product-item">
        <img src='sq6.jpeg' alt="Popular product 6" />
        <div className="product-label">CDMO</div>
      </Link>
    </div>
  );
};

export default PopularProducts;
