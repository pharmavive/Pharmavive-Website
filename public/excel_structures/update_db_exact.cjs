const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  // 1. Zabedosertib -> N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide
  await db.collection('products').updateOne(
    { casNumber: '2751749-06-9' },
    {
      $set: {
        name: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
        chemicalName: 'N-(6-(2-Hydroxypropan-2-yl)-1-(2-(methylsulfonyl)ethyl)-1H-indazol-5-yl)-6-(trifluoromethyl)picolinamide',
        image: '/excel_structures/excel_structure_1.png',
        categoryName: 'Reagent',
      }
    }
  );

  // 2. 5-(Piperazin-1-yl)benzofuran-2-carboxamide
  await db.collection('products').updateOne(
    { casNumber: '183288-46-2' },
    {
      $set: {
        name: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
        chemicalName: '5-(Piperazin-1-yl)benzofuran-2-carboxamide',
        image: '/excel_structures/excel_structure_2.png',
        categoryName: 'Reference Standards',
      }
    }
  );

  // 3. 1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid
  await db.collection('products').updateOne(
    { casNumber: '112811-72-0' },
    {
      $set: {
        name: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
        chemicalName: '1-Cyclopropyl-6,7-difluoro-8-methoxy-4-oxo-1,4-dihydroquinoline-3-carboxylic acid',
        commonName: 'Moxifloxacin Difluoro Methoxy Impurity',
        image: '/excel_structures/excel_structure_3.png',
        categoryName: 'Impurity',
      }
    }
  );

  // 4. (R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate
  await db.collection('products').updateOne(
    { casNumber: '143322-56-9' },
    {
      $set: {
        name: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
        chemicalName: '(R)-Benzyl 2-(5-bromo-1H-indole-3-carbonyl)pyrrolidine-1-carboxylate',
        image: '/excel_structures/excel_structure_4.png',
        categoryName: 'Impurity',
      }
    }
  );

  console.log('Successfully updated 4 products in MongoDB with exact chemical names and Excel structure images.');
  await mongoose.disconnect();
}

run().catch(console.error);
