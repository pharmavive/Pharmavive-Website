import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows / Node.js querySrv ECONNREFUSED with MongoDB Atlas cluster URLs
if (dns && typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // Ignore if not permitted in current execution context
  }
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      family: 4,
    };

    try {
      if (dns && typeof dns.setServers === 'function') {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      }
    } catch (err) {
      console.warn('[MongoDB] dns.setServers warning:', err.message);
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

export default dbConnect;
