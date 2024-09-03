// 1)import
// 2)traitement
// 3)export
// 1) importer le module installé dans une constante('nom de module' :express)
const express = require('express');
// importer le module installé body-parser
const bodyParser = require('body-parser');
// importer le module installé mongoose
const mongoose = require('mongoose');
// importer le module installé bcrypt
const bcrypt = require('bcrypt');
// importer le module installé jsonWebToken
const jwt = require('jsonwebtoken');
// importer le module installé express session
const expressSession = require('express-session');
// importer le module installé multer
const multer = require('multer');
// importer le module interne path;  sans installation
const path = require('path');
// se connecter sur le port et le path c'est pour se poniter sur le nom de la base de données.
// lors de declaration de la base de donnees, elle sera crée automatiquement
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');
// 2)creates express application : app
const app = express();
// 3)app configuration : en utilisant use
// format de donnees json
app.use(bodyParser.json());
// recupere les objets from input: post et put
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
    // au lieu de permettre * au pls FE denvoyer des requetes , on peut utiliser le port du FE qu'on veut recevoir les requetes from.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, Accept, Content-Type, X-Requested-with, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, OPTIONS, PATCH, PUT'
    );
    // il faut respecter tout pour passer a l'etape suivante: traitement
    next();
});
// configuration de session : chiffrement symetrique
const secretKey = 'croco24YT';
app.use(expressSession({
    secret: secretKey,
}));
app.use('/shortcut', express.static(path.join('backend/images')))
// on peut ajouter des autres extensions feg:video,pdf
const MIME_TYPE = {
    'image/png': 'png', 'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
// storage configuration
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/images')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});


// 4) Models importation
const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const player = require('./models/player');
const User = require('./models/user');

//4) Traitement logique des requetes: business logic
// business logic : Add Match
let matchesTable = [{ id: 1, scoreOne: 2, scoreTwo: 4, teamOne: 'FCB', teamTwo: 'RMD', result: "" },
{ id: 2, scoreOne: 8, scoreTwo: 5, teamOne: 'FCB', teamTwo: 'EST', result: "" },
{ id: 3, scoreOne: 9, scoreTwo: 6, teamOne: 'EST', teamTwo: 'RMD', result: "" },
{ id: 4, scoreOne: 3, scoreTwo: 7, teamOne: 'LIV', teamTwo: 'CIT', result: "" },
{ id: 4, scoreOne: 3, scoreTwo: 3, teamOne: 'FCB', teamTwo: 'CIT', result: "" }];

let playersTable = [{ id: 1, name: "halim", number: 4, position: 'FCB', age: 16 },
{ id: 2, name: "mostfa", number: 5, position: 'FCB', age: 20 },
{ id: 3, name: "zoubair", number: 6, position: 'FCB', age: 18 },
{ id: 4, name: "lotfi", number: 7, position: 'FCB', age: 30 },];

let teamsTable = [{ id: 1, name: 2, owner: "SALAH", foundation: 1919 },
{ id: 2, name: "FSB", owner: "SALAH", foundation: 1919 },
{ id: 3, name: "CIT", owner: "HEDI", foundation: 1919 }];

app.post("/matches", (req, res) => {
    // req.body: recuperer l'objet par body parser 
    console.log("here into BL: Add Match", req.body);
    // creation match instance de type Match
    let match = new Match(req.body);
    // insert/save match into matches(collection name)
    // le sauvegarde de nouveau object de type match
    match.save();
    // matchesTable.push(match);
    // la derniere ligne c'est res.json: la reponse
    res.json({ isAdded: true });
});
// business logic :search matches by scoreOne  and scoreTw
app.post("/matches/search", (req, res) => {
    // req.body: recuperer l'objet par body parser 
    console.log("here into BL: search Match", req.body);
    let matches = matchesTable.filter((elt) => elt.scoreOne == req.body.scoreOne && elt.scoreTwo == req.body.scoreTwo)
    // la derniere ligne c'est res.json.
    res.json({ foundMatches: matches });
});

// business logic : Edit Match
app.put("/matches", (req, res) => {
    console.log("here into BL:Edit Match", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("here is the edited match", result);
        if (result.nModified == 1) {
            res.json({ isEdited: true });
        } else {
            res.json({ isEdited: false });
        }
    })
});
// business logic : Get All Matches
app.get("/matches", (req, res) => {
    console.log("here into BL:Get All Matches");
    Match.find().then((docs) => {
        console.log("here all Matches from collection", docs);
        res.json({ T: docs });
    });
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
});

// business logic : Delete Match By Id
app.delete("/matches/:id", (req, res) => {
    console.log("here into BL: Delete Match By Id", req.params.id);
    let matchId = req.params.id;
    //    si on a  le id unique de match, on le supprime de de la collection matches
    Match.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("here result after delete", result);
        // on fait l'acces a deletedCount pour voir le resultat de la suporession car result est de type objet
        if (result.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }
    })
});

// business logic : Get Match By Id
app.get("/matches/:id", (req, res) => {
    console.log("here into BL: Get  Match By Id", req.params.id);
    Match.findById(req.params.id).then((doc) => {
        console.log("here doc:", doc);
        res.json({ match: doc });
    });
});
// player
// business logic : Add Player
app.post("/players", (req, res) => {
    console.log("here into BL: Add Player", req.body);
    // playersTable.push(player);
    // la derniere ligne c'est res.json.
    Team.findById(req.body.teamId).then((team) => {
        console.log("doc", team);
        if (!team) {
            res.json({ msg: "Team Not Found" });
        } else {
            // add player : si les attributs sont differents
            const playerObject = new Player({
                name: req.body.name,
                age: req.body.age,
                number: req.body.number,
                position: req.body.position,
                // tId:req.body.teamId,: de type string donc il faut le changer a object id
                // object id from teal collection ou bien : 
                tId: team._id
            });
            // erreur ou bien doc:savedPlayer:playerObject
            playerObject.save((err, savedPlayer) => {
                // error:error
                // doc : success(object,_id)
                if (err) {
                    res.json({ msg: "player Not Saved" });
                } else {
                    // add saved player id into players attribute
                    // .players:attribut dans team de la collection Team
                    team.players.push(savedPlayer._id);
                    // apres la modification de team.players (l'add de l'id dans le tableau players) , on sauvegarde team  dans la base de donnees dans team collection;
                    team.save();
                    // response
                    res.json({ msg: "player Added" });
                }
            });

        }
    })
});
// business logic : Edit Player
app.put("/players", (req, res) => {
    console.log("here into BL:Edit Player", req.body);
    player.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("here is the edited match", result);
        if (result.nModified == 1) {
            res.json({ isEdited: true });
        } else {
            res.json({ isEdited: false });
        }
    })
});
// business logic : Get All Players
app.get("/players", (req, res) => {
    console.log("here into BL:Get All Players");
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
    Player.find().then((docs) => {
        console.log("here all Players from collection", docs);
        res.json({ T: docs });
    })
});
// business logic : Delete Player By Id
app.delete("/players/:id", (req, res) => {
    console.log("here into BL: Delete Player By Id", req.params.id);
    Player.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("here result after delete", result);
        if (result.deletedCount == 1) {
            res.json(isDeleted = true);

        } else {
            res.json(isDeleted = false);
        }
    })

});
// business logic : Get Player By Id
app.get("/players/:id", (req, res) => {
    console.log("here into BL: Get  Player By Id", req.params.id);
    Player.findById(req.params.id).then((doc) => {
        console.log("here is the player", doc);
    })
    res.json({ player: doc });
});
// business logic :search players by age
app.post("/players/search", (req, res) => {
    // req.body: recuperer l'objet par body parser 
    console.log("here into BL: search Player", req.body);
    let players = playersTable.filter((elt) => elt.age == req.body.age)
    // la derniere ligne c'est res.json.
    res.json({ foundPlayers: players });
});
// Team
// business logic : Add team
app.post("/teams", (req, res) => {
    console.log("here into BL: Add team", req.body);
    let team = new Team(req.body);
    // teamsTable.push(team);
    // la derniere ligne c'est res.json.
    team.save();
    res.json({ isAdded: true });
});
// business logic : Edit team
app.put("/teams", (req, res) => {
    console.log("here into BL:Edit team", req.body);
    Team.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("here is the edited team", result);
        if (result.nModified == 1) {
            res.json({ isEdited: true });
        } else {
            res.json({ isEdited: false });
        }
    })
});
// business logic : Get All teams
app.get("/teams", (req, res) => {
    console.log("here into BL:Get All teams");
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
    Team.find().then((docs) => {
        console.log("here all Matches from collection", docs);
        Team.find().populate("players").then((docs) => {
            res.json({ T: docs });
        })

    })
});
// business logic : Delete team By Id
app.delete("/teams/:id", (req, res) => {
    console.log("here into BL: Delete team By Id", req.params.id);
    Team.deleteOne({ _id: req.params.id }).then((result) => {
        if (result.deletedCount == 1) {
            res.json(isDeleted = true);
        } else {
            res.json(isDeleted = false);
        }
    })
});
// business logic : Get team By Id
// le path est dynamique: path paramétré en utilisant les ":"
app.get("/teams/:id", (req, res) => {
    console.log("here into BL: Get  team By Id", req.params.id);
    Team.findById(req.params.id).then((doc) => {
        console.log("here is the team", doc);
    })
    res.json({ team: doc });
});
// business logic : signUp
app.post("/users", multer({ storage: storageConfig }).single('img'), (req, res) => {
    // img tebaa service en append
    console.log("here into BL:user object", req.body);
    User.findOne({ email: req.body.email }).then((user) => {
        console.log("here is the user", user);
        if (!user) {
            // cryptage de password
            bcrypt.hash(req.body.password, 10).then((cryptedpwd) => {
                console.log("here is the crypted pwd", cryptedpwd);
                req.body.password = cryptedpwd;
                // req.body.filePath = `http://localhost:3000/shortcut/${req.file.filename}`;
                // if (req.file) {
                //     req.body.filePath = `http://localhost:3000/shortcut/${req.file.filename}`;
                // }
                // else {
                //     req.body.filePath ="C:\Users\DONIA\Desktop\Projet Angular\sport\backend\images\fawad.png";
                // }
                // ternary operator:ternaire
                (req.file)?
                  req.body.filePath = `http://localhost:3000/shortcut/${req.file.filename}`:
                  req.body.filePath ="C:\Users\DONIA\Desktop\Projet Angular\sport\backend\images\fawad.png";


                let user = new User(req.body);
                user.save();
                res.json({ isAdded: true, user: user });
            })

        }
        else {
            // res.json({ user: null });
            res.json({ msg: "user Exist" });
        }
    })
});
// business logic : login
app.post("/users/login", (req, res) => {
    console.log("here into BL:user object", req.body);

    User.findOne({ email: req.body.email }).then((doc) => {
        console.log("here doc by email", doc);
        if (doc) {
            // compare password :ordre  de comparaison : le (pwd de formulaire FE , le password dans la BD)
            bcrypt.compare(req.body.password, doc.password).then((result) => {
                console.log("here is the result from bcrypt", result);
                if (result) {
                    let userToSend = {
                        id: doc._id,
                        FN: doc.firstName,
                        LN: doc.lastName,
                        role: doc.role,
                        filePath:doc.filePath,
                    }
                    let token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' })
                    console.log("here token", token);
                    res.json({ msg: "welcome", user: token });
                } else {
                    res.json({ msg: "Check password" });
                }
            })
        }
        else {
            // res.json({ user: null });
            res.json({ msg: "Email doesn't Exist" });
        }
    })
});
// 5) cette  application est exporté : sera importé dans d'autres fichiers : importable
module.exports = app;
