const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  if (!MONGODB_URI) {
    console.error('No MONGODB_URI');
    return;
  }
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({
    casNumber: { $in: ['2751749-06-9', '183288-46-2', '112811-72-0', '143322-56-9'] }
  }).toArray();
  
  console.log('MongoDB products count:', products.length);
  products.forEach(p => {
    console.log({
      _id: p._id,
      name: p.name,
      chemicalName: p.chemicalName,
      casNumber: p.casNumber,
      slug: p.slug,
      image: p.image
    });
  });
  
  await mongoose.disconnect();
}

run().catch(console.error);
