var env = process.env.NODE_ENV || 'development';
export default require('./'+env);
