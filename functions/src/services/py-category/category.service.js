const axios = require('axios');

async function getCategoriesService() {
    const url = `${process.env.API_PYTHON_URL}/categories/`;
    const apiData = await axios.get(url);
    const data = apiData.data;
    
    const response = data.map((cat) => ({
        id: cat.id,
        title: cat.title,
        icon: cat.icon,
    }));

    return response;
};

module.exports = { getCategoriesService };
