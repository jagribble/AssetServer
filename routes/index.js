var express = require('express');


router.get('/', function(req, res) {
  //initialise empty array for results of db query
  res.render('index');
});

router.get('/test',(req,res)=>{
  res.send('hello world');
});

return router;
};
