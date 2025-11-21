const { categorySchema } = require("./category.schema");
const repository = require("../../repositories/category.repository");
const { v4: uuid } = require("uuid");

async function createCategory(req, res) {
    try {
        const { error, value } = categorySchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const id = uuid();

        const newCategory = {
            title: value.title,
            icon: value.icon
        };

        const currentState = await repository.createCategory(id, newCategory);

        return res.status(201).json( currentState );
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createCategory }