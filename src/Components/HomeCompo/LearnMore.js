import Link from 'next/link';
import './LearnMore.css';

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      <div className="left-section">
        <p>
          At Pharmavive, we specialize in the development and supply of high-quality API impurities and offer comprehensive Contract Development and Manufacturing Organization (CDMO) services. Our commitment to excellence and innovation positions us as a reliable partner in the pharmaceutical industry. Embracing the &apos;Made in India&apos; ethos, we ensure that our products and services meet international standards while supporting local manufacturing and development.
        </p>
        <Link href="/about" className="learn-more-button">Learn More</Link>
      </div>
      <div className="right-section">
        <img src='/lm.png' alt="lm-img" />
      </div>
    </div>
  );
}

export default LearnMore;
