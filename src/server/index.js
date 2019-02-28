const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));

app.use(bodyParser.json());

app.get('/api/vals/:id', async (req, res, next) => {
  if (req.params.id === 'error') {
    next('Id cannot be error');
    return;
  }

  const { data } = await axios.get(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190228T071413Z.c13546a178ae6df3.0baab50a488cc6b9aebb64ac824b7764fae230ed&text=${encodeURI(
      req.params.id
    )}&lang=en`
  );
  if (req.params.id != null && req.params.id !== 'XX') {
    res.send(
      data.text.length > 0
        ? `Translation: ${data.text[0]} Detected language: ${data.lang}`
        : `Couldnt Translate ${req.params.id}`
    );
  } else {
    res.send('Not sending empty string for translation');
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
