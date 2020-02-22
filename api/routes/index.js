const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send({
    my_blog_api: 'hello world',
  });
});

module.exports = router;
