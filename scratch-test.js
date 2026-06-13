import eslintConfig from './eslint.config.mjs';
// No ConfigValidator import

console.log("Loading eslintConfig:", eslintConfig);
try {
  // Let's print each item in eslintConfig to see what it contains
  eslintConfig.forEach((config, idx) => {
    console.log(`\nConfig #${idx}:`);
    for (const key of Object.keys(config)) {
      if (key === 'plugins') {
        console.log(`  plugins:`, Object.keys(config.plugins));
      } else if (key === 'rules') {
        console.log(`  rules count:`, Object.keys(config.rules).length);
      } else {
        console.log(`  ${key}:`, typeof config[key] === 'object' ? '[Object]' : config[key]);
      }
    }
  });
} catch (e) {
  console.error(e);
}
