const { db } = require("../utils/firebase");
const { ResourceNotFoundError } = require("../utils/errores");

async function getCategories() {
  const snap = await db.ref("categories").once("value");
  const data = snap.val();
  if (!data) throw new EmptySetError("No se encontraron categorías.");
  return data; // si querés como array: Object.entries(data).map(([id, v]) => ({ id, ...v }))
}

async function getCategoryById(id) {
  const snap = await db.ref(`categories/${id}`).once("value");
  const data = snap.val();
  if (!data)
    throw new ResourceNotFoundError("La categoría no ha sido encontrada.");
  return { id, ...data };
}

async function createCategory(id, data) {
  const ref = db.ref(`categories/${id}`);
  await ref.set(data);
  const snap = await ref.once("value");
  return { id, ...snap.val() };
}

async function updateCategory(id, data) {
  const ref = db.ref(`categories/${id}`);
  const snap = await ref.once("value");
  if (!snap.exists())
    throw new ResourceNotFoundError("La categoría no ha sido encontrada.");
  await ref.update(data);
  const updated = (await ref.once("value")).val();
  return { id, ...updated };
}

async function deleteCategory(id) {
  await db.ref(`categories/${id}`).remove();
  return true;
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
