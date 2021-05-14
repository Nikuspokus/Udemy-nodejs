require("babel-register");
const func = require("functions");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const members = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Julie",
  },
  {
    id: 3,
    name: "Jack",
  },
];
///////////////////////////////////////////////////////////
//middleware morgan, permet d'avoir le temps de réponse de chaque requete
///////////////////////////////////////////////////////////
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.bodyParser.json())
// app.use(express.bodyParser.urlencoded({ extended: true }))

app.get("/api/v1/members/:id", (req, res) => {
  res.json(func.success(members[req.params.id - 1].name));
});

app.get("/api/v1/members/", (req, res) => {
  if (req.query.max != undefined && req.query.max > 0) {
    res.json(func.success(members.slice(0, req.query.max)));
  } else if (req.query.max != undefined) {
    res.json(func.error("wrong max value"));
  } else {
    res.json(func.success(members));
  }
});

app.post("/api/v1/members", (req, res) => {
  if (req.body.name) {
    let sameName = false;
    for (let i = 0; i < members.length; i++) {
      if (members[i].name == req.body.name) {
        sameName = true;
        break;
      }
    }

    if (sameName) {
      res.json(func.error("name already used !!!"));
    } else {
      let member = {
        id: members.length + 1,
        name: req.body.name,
      };

      members.push(member);

      res.json(func.success(member));
    }
  } else {
    res.json(func.error("no name value"));
  }
});

//programme qui s'execute avant tout le reste
///////////////////////////////////////////////////////////
// app.use((req,res,next) => {
//     console.log('URL :' + req.url);
//     next()
// })
///////////////////////////////////////////////////////////

// app.get('/',(req, res) => {
//     res.send('Root home')
// })
// app.get('/api',(req, res) => {
//     res.send('Root API')
// })

// app.get('/api/v1',(req, res) => {
//     res.send('API Version 1')
// })
///////////////////////////////////////////////////////////
//  /:id permet de prendre en compte des parametre ici l'ID
///////////////////////////////////////////////////////////
// app.get('/api/v1/books/:id', (req, res) => {
//     res.send(req.params)
// })

app.listen(8080, () => console.log("Started on port 8080"));
