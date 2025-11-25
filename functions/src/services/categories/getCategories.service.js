const repository = require('../../repositories/category.repository.js');

async function getCategories(req, res) {
    try {
        const data = await repository.getCategories();
        return res.status(200).json(data);
    } catch ( error ) {
        return res.status(500).json({ error: error.message });
    }
}

async function getCategory(req, res) {
    try {
        const cat = await repository.getCategoryById(req.query.id);
        return res.status(200).json(cat);
    }catch ( error ) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { getCategories, getCategory }