 const createCategory = require("./createCategory.service");
 const getCategories = require("./getCategories.service");
 const updateCategory = require("./updateCategory.service");
 const deleteCategory = require("./deleteCategory.service");

module.exports = {
    ...createCategory,
    ...getCategories,
    ...updateCategory,
    ...deleteCategory
};