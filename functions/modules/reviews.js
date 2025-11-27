require("../config/environment");
const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

const auth_mw = require("../src/middlewares/auth.middleware");
const val_mw = require("../src/middlewares/validate.middleware");
const err_mw = require("../src/middlewares/error.middleware");

const schema = require("../src/validations/servicios/service.schema");
const schema_review = require("../src/validations/servicios/review.schema")
const reviewController = require("../src/controllers/review.controller");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/* ===== RUTAS REVIEWS ===== */

// POST /services/:categoryId/:serviceId/reviews => crear review
app.post(
  "/:categoryId/:serviceId/reviews",
  val_mw.validateParams(schema.serviceParamsSchema),
  val_mw.validateBody(schema_review.reviewPayloadSchema),
  err_mw.asyncHandler(reviewController.createReview)
);

// GET /services/:categoryId/:serviceId/reviews => listar reviews de un servicio
app.get(
  "/:categoryId/:serviceId/reviews",
  val_mw.validateParams(schema.serviceParamsSchema),
  err_mw.asyncHandler(reviewController.listReviews)
);

// GET /services/:categoryId/:serviceId/reviews/:reviewId => obtener una review
app.get(
  "/:categoryId/:serviceId/reviews/:reviewId",
  val_mw.validateParams(schema.reviewParamsSchema),
  err_mw.asyncHandler(reviewController.getReview)
);

// DELETE /services/:categoryId/:serviceId/reviews/:reviewId => eliminar una review (ADMIN)
app.delete(
  "/:categoryId/:serviceId/reviews/:reviewId",
  val_mw.validateParams(schema_review.reviewParamsSchema),
  // auth_mw.requireAdmin,
  err_mw.asyncHandler(reviewController.deleteReview)
);

app.patch(
  "/:categoryId/:serviceId/reviews/:reviewId",
  val_mw.validateParams(schema_review.reviewParamsSchema),      
  val_mw.validateBody(schema_review.reviewPatchSchema),  
  err_mw.asyncHandler(reviewController.updateReview)
);

/* ===== MIDDLEWARES DE ERROR ===== */

app.use(err_mw.jsonInvalidHandler);
app.use(err_mw.notFoundHandler);
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
