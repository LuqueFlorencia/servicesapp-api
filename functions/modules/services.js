require("../config/environment");
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

const auth_mw = require("../src/middlewares/auth.middleware");
const val_mw = require("../src/middlewares/validate.middleware");
const err_mw = require("../src/middlewares/error.middleware");

const schema = require("../src/validations/servicios/service.schema");
const serviceController = require("../src/controllers/service.controller");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// POST || crear servicio 
app.post(
  "/:categoryId",
  val_mw.validateParams(schema.categoryParamsSchema),
  val_mw.validateBody(schema.servicePayloadSchema),
  err_mw.asyncHandler(serviceController.createService),
);

// GET || listar servicios de categoría
app.get(
  "/:categoryId",
  val_mw.validateParams(schema.categoryParamsSchema),
  val_mw.validateQuery(schema.listServicesQuerySchema),
  err_mw.asyncHandler(serviceController.listServices)
);

// GET || obtener servicio por id
app.get(
  "/:categoryId/:serviceId",
  val_mw.validateParams(schema.serviceParamsSchema),
  err_mw.asyncHandler(serviceController.getService)
);

// PATCH || actualizar servicio
app.patch(
  "/:categoryId/:serviceId",
  val_mw.validateParams(schema.serviceParamsSchema),
  val_mw.validateBody(schema.servicePatchSchema),
  err_mw.asyncHandler(serviceController.updateService)
);

// DELETE || eliminar servicio
app.delete(
  "/:categoryId/:serviceId",
  val_mw.validateParams(schema.serviceParamsSchema),
  err_mw.asyncHandler(serviceController.deleteService)
);

//middlewares de error

app.use(err_mw.jsonInvalidHandler);
app.use(err_mw.notFoundHandler);
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
