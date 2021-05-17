require("babel-register");
const { success, error } = require("functions");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const config = require("./config");

const db = mysql.createConnection({
  host: 'localhost',
  database: 'nodejs',
  user: 'root',
  password: '',
});

// db.query('SELECT * FROM members', (err, result) => {
//   if (err)
//       console.log(err.message)
//   else
//       console.log(result[0].name);
// })

db.connect((err) => {
  if (err) console.log(err.message);
  else {
    console.log("Connected");

    const app = express();

    let MembersRouter = express.Router();

    app.use(morgan("dev"));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    MembersRouter.route("/:id")

      //Récupère un membre avec son ID
      .get((req, res) => {
        let index = getIndex(req.params.id);
        if (typeof index == "string") {
          res.json(error(index));
        } else {
          res.json(success(members[index]));
        }
        res.json(success(members[req.params.id - 1].name));
      })

      //Modifie un membre avec son ID
      .put((req, res) => {
        let index = getIndex(req.params.id);

        if (typeof index == "string") {
          res.json(error(index));
        } else {
          let same = false;
          for (let i = 0; i < members.length; i++) {
            if (
              req.body.name == members[i].name &&
              req.params.id != members[i].id
            ) {
              same = true;
              break;
            }
          }
          if (same) {
            res.json(error("same name !!"));
          } else {
            members[index].name = req.body.name;
            res.json(success(true));
          }
        }
      })

      //Supprime un membre avec son ID
      .delete((req, res) => {
        let index = getIndex(req.params.id);
        if (typeof index == "string") {
          res.json(error(index));
        } else {
          members.splice(index, 1);
          res.json(success(members));
        }
      });

    MembersRouter.route("/")

      //Récupère tous les membres
      .get((req, res) => {
        if (req.query.max != undefined && req.query.max > 0) {
          res.json(success(members.slice(0, req.query.max)));
        } else if (req.query.max != undefined) {
          res.json(error("wrong max value"));
        } else {
          res.json(success(members));
        }
      })

      //Ajoute un membre
      .post((req, res) => {
        if (req.body.name) {
          let sameName = false;
          for (let i = 0; i < members.length; i++) {
            if (members[i].name == req.body.name) {
              sameName = true;
              break;
            }
          }

          if (sameName) {
            res.json(error("name already used !!!"));
          } else {
            let member = {
              id: createID(),
              name: req.body.name,
            };
            members.push(member);
            res.json(success(member));
          }
        } else {
          res.json(error("no name value"));
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

    app.use(config.return + "members", MembersRouter);

    app.listen(config.port, () =>
      console.log("Started on port " + config.port)
    );
  }
});

///////////////////////////////////////////////////////////
//middleware morgan, permet d'avoir le temps de réponse de chaque requete
///////////////////////////////////////////////////////////

function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) return i;
  }

  return "wrong id";
}

function createID() {
  return members[members.length - 1].id + 1;
}
