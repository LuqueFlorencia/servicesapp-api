const repository = require("../../repositories/category.repository");

async function updateCategory (req, res) {
    try {
        const id = req.query.id;
        if (!id) return res.status(400).json({ error: "La categoría es obligatoria" });

        const exists = await repository.getCategoryById(id);
        if (!exists) return res.status(404).json({ error: "Categoría no hallada." });

        const updated = await repository.updateCategory(id, req.body);

        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { updateCategory }