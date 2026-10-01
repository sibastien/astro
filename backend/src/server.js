/**
 * Main Express Server – AstroFrance
 */

require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config/env');

const port = PORT || 5000;

app.listen(port, () => {
  console.log(`\n🚀 AstroFrance API running on http://localhost:${port}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
