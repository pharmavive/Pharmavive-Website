import Link from 'next/link';

import './HomeCover.css';

const HomeCover = () => {

  return (
    <div className="home-cover">
      <video className="home-cover-video" autoPlay loop muted playsInline>
        <source src='/vid_small.mp4' type="video/mp4" />
      </video>
      
      <div className="home-cover-text">
        Your Trusted Partner for API Impurities and CDMO Services, Championing the &apos;Made in India&apos; Initiative
      </div>
      
      <Link className="view-products-button" href='/products'>
        View Products
      </Link>
    </div>
  );
};

export default HomeCover;
