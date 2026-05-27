const Product = require('../models/product');

// @desc    Get product recommendations (Mocked RapidMiner Integration)
// @route   GET /api/analytics/recommendations
// @access  Public
const getRecommendations = async (req, res) => {
  // In a real scenario, this would communicate with a RapidMiner API
  // or use a trained model to fetch recommendations for the user.
  // For the assignment, we will mock this by returning top rated products.
  
  const recommendedProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(recommendedProducts);
};

module.exports = { getRecommendations };
