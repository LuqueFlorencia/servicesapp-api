const { db } = require("../utils/firebase.js");
const {
    EmptySetError,
    ResourceNotFoundError
} = require('../utils/httpsStatusCode.js');

async function getCategories() {
    const snapshot = await db.ref("categories");
	const data = snapshot.once('value').val();

    if(!data) throw new EmptySetError("No se encontraron categorías.");
    return data;
};

async function getCategoryById(id) {
    const snapshot = await db.ref(`categories/${id}`);
	const data = snapshot.once('value').val();

    if(!data) throw new ResourceNotFoundError('La categoría no ha sido encontrada.');
    return { id, ...data };
};

async function createCategory(id, data) {
    const ref = db.ref(`categories/${id}`);
    await ref.set(data);
    const snapshot = await ref.once('value');
    return { id, ...snapshot.val() };
};

async function updateCategory(id, data) {
    const ref = db.ref(`categories/${id}`);
    await ref.update(data);
    const snapshot = await ref.once('value');
    return { id, ...snapshot.val() };
};

async function deleteCategory(id) {
    await db.ref(`categories/${id}`).remove();
    return true;
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}