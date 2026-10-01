/**
 * 404 Not Found Middleware
 */

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route introuvable: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFound;
