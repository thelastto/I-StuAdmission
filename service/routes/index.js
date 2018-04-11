module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'hello express!'});
  });
  app.use('/api/user', require('./user')); 
  app.use('/api/feedback', require('./feedback')); 
  app.use('/oauth', require('./oauth')); 
  app.use('/api/aboutUs', require('./aboutUs')); 
};
