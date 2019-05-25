'use strict';

import { Schema } from 'mongoose';

export const url = (database) => {

  const UrlSchema = new Schema({
    active: {
      type: Boolean,
      default: true,
    },
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    original: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  }).pre('save', function(next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });

  database.model('url', UrlSchema);
  return database.model('url');
};
