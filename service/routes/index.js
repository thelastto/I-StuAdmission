module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'hello express!'});
  });
  app.use('/api/user', require('./user')); 
  app.use('/api/download', require('./download')); 
  app.use('/api/upload', require('./upload')); 
  app.use('/api/feedback', require('./feedback')); 
  app.use('/oauth', require('./oauth')); 
  app.use('/api/aboutUs', require('./aboutUs')); 
  app.use('/api/student', require('./student')); 
  app.use('/api/channel', require('./channel')); 
  app.use('/api/major', require('./major')); 
  app.use('/api/teacher', require('./teacher')); 
  app.use('/api/news', require('./news')); 
};
