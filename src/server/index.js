const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());

app.get('/api/vals/:id', (req, res, next) => {
  if (req.params.id === 'error') {
    next('Id cannot be error');
    return;
  }
  res.send(`Response: ${req.params.id}`);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
