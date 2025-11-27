require("../config/environment");
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

// const auth_mw = require("../src/middlewares/auth.middleware");
const val_mw = require("../src/middlewares/validate.middleware");
const err_mw = require("../src/middlewares/error.middleware");

const schema = require("../src/validations/servicios/service.schema");
const schema_gallery = require("../src/validations/servicios/gallery.schema")
const galleryController = require("../src/controllers/gallery.controller");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/* ===== RUTAS GALLERYS ===== */

// POST /services/:categoryId/:serviceId/gallerys => crear gallery
app.post(
  "/:categoryId/:serviceId/gallerys",
  val_mw.validateParams(schema.serviceParamsSchema),
  val_mw.validateBody(schema_gallery.gallerySchema),
  err_mw.asyncHandler(galleryController.createGallery)
);

// GET /services/:categoryId/:serviceId/gallerys => listar gallerys de un servicio
app.get(
  "/:categoryId/:serviceId/gallerys",
  val_mw.validateParams(schema.serviceParamsSchema),
  err_mw.asyncHandler(galleryController.listGallerys)
);

// GET /services/:categoryId/:serviceId/gallerys/:galleryId => obtener una gallery
app.get(
  "/:categoryId/:serviceId/gallery/:galleryId",
  val_mw.validateParams(schema_gallery.galleryParamsSchema),
  err_mw.asyncHandler(galleryController.getGallery)
);

// DELETE /services/:categoryId/:serviceId/gallerys/:galleryId => eliminar una gallery (ADMIN)
app.delete(
  "/:categoryId/:serviceId/gallery/:galleryId",
  val_mw.validateParams(schema_gallery.galleryParamsSchema),
  err_mw.asyncHandler(galleryController.deleteGallery)
);

/* ===== MIDDLEWARES DE ERROR ===== */

app.use(err_mw.jsonInvalidHandler);
app.use(err_mw.notFoundHandler);
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
