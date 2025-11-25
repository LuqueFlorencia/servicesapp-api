const repository = require("../../repositories/category.repository");

async function deleteCategory(req, res) {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ error: "Se requiere el id de la categoría." });

        const exists = await repository.getCategoryById(id);
        if (!exists) return res.status(404).json({ error: "La categoría no ha sido encontrada." });

        await repository.deleteCategory(id);

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { deleteCategory }