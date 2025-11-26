const getGallery = require('./getGallery.service');
const deleteGallery = require('./deleteGallery.service');
const createGalleryData = require('./createGallery.service');
const listGallery = require('./listGallery.service');
const updateGalleryData = require('./updateGallery.service');

module.exports = {
  ...getGallery,
  ...deleteGallery,
  ...createGalleryData,
  ...listGallery,
  ...updateGalleryData,
};
