import { MongoDB } from '../../db';

const mongodb = new MongoDB();

export const Url = {
  create: async(data) => {
    const { url } = mongodb.models;
    try {
      return await url.create(data);
    } catch(err) {
      console.error('MongoDB: error creating models.url', err.message);
      throw 7;
    }
  },
};


