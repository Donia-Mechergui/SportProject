// 1)import
// 2)traitement
// 3)export
// 1) importer le module installé dans une constante('nom de module' :express)
const express = require('express');
// importer le module installé body-parser
const bodyParser = require('body-parser');
// importer le module installé mongoose
const mongoose = require('mongoose');
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
// 4) Models importation
const Match=require("./models/match");

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
    let match = req.body;
    matchesTable.push(match);
    // la derniere ligne c'est res.json.
    res.json({ isAdded: true });
});
// business logic :search matches by scoreOne  and scoreTw
app.post("/matches/search",(req,res)=> {
    // req.body: recuperer l'objet par body parser 
    console.log("here into BL: search Match", req.body);
    let matches=matchesTable.filter((elt)=>elt.scoreOne == req.body.scoreOne && elt.scoreTwo == req.body.scoreTwo)
    // la derniere ligne c'est res.json.
    res.json({foundMatches:matches });
});

// business logic : Edit Match
app.put("/matches", (req, res) => {
    console.log("here into BL:Edit Match", req.body);
    let newMatch = req.body;
    let pos = matchesTable.findIndex((elt) => elt.id == newMatch.id);
    matchesTable[pos] = newMatch;
    res.json({ isEdited: "ok" });
});
// business logic : Get All Matches
app.get("/matches", (req, res) => {
    console.log("here into BL:Get All Matches");
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
    res.json({ T: matchesTable });
});

// business logic : Delete Match By Id
app.delete("/matches/:id", (req, res) => {
    console.log("here into BL: Delete Match By Id", req.params.id);
    let matchId = req.params.id;
    let pos = matchesTable.findIndex((elt) => elt.id == matchId);
    console.log("here is pos", pos);
    matchesTable.splice(pos, 1);
    res.json({ isDeleted: true });

});

// business logic : Get Match By Id
app.get("/matches/:id", (req, res) => {
    console.log("here into BL: Get  Match By Id", req.params.id);
    let matchId = req.params.id;
    // nom de la variable
    let match = matchesTable.find((elt) => elt.id == matchId);
    // le resultat sera dans le console de brouser :FE
    console.log("here founded match", match);
    // nom de l'attribut
    res.json({ match: match });


});
// player
// business logic : Add Player
app.post("/players", (req, res) => {
    console.log("here into BL: Add Player", req.body);
    let player = req.body;
    playersTable.push(player);
    // la derniere ligne c'est res.json.
    res.json({ isAdded: true });
});
// business logic : Edit Player
app.put("/players", (req, res) => {
    console.log("here into BL:Edit Player",req.body);
    let newPlayer=req.body;
    let pos=playersTable.findIndex((elt)=>elt.id==newPlayer.id);
    playersTable[pos]=newPlayer;
    res.json({isEdited:true});
});
// business logic : Get All Players
app.get("/players", (req, res) => {
    console.log("here into BL:Get All Players");
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
    res.json({ T: playersTable });
});
// business logic : Delete Player By Id
app.delete("/players/:id", (req, res) => {
    console.log("here into BL: Delete Player By Id", req.params.id);
    let playerId = req.params.id;
    let pos = playersTable.findIndex((elt) => elt.id == playerId);
    console.log('pos', pos);
    playersTable.splice(pos, 1);
    res.json(isDeleted = true);
});
// business logic : Get Player By Id
app.get("/players/:id", (req, res) => {
    console.log("here into BL: Get  Player By Id", req.params.id);
    let playerId = req.params.id;
    console.log("player id is", playerId);
    let player = playersTable.find((elt) => elt.id == playerId);
    console.log("the player :", player);
    res.json({ player: player });
});
// business logic :search players by age
app.post("/players/search",(req,res)=> {
    // req.body: recuperer l'objet par body parser 
    console.log("here into BL: search Player", req.body);
    let players=playersTable.filter((elt)=>elt.age == req.body.age)
    // la derniere ligne c'est res.json.
    res.json({foundPlayers:players });
});
// Team
// business logic : Add team
app.post("/teams", (req, res) => {
    console.log("here into BL: Add team", req.body);
    let team = req.body;
    teamsTable.push(team);
    // la derniere ligne c'est res.json.
    res.json({ isAdded: true });
});
// business logic : Edit team
app.put("/teams", (req, res) => {
    console.log("here into BL:Edit team");
});
// business logic : Get All teams
app.get("/teams", (req, res) => {
    console.log("here into BL:Get All teams");
    // le format json dans la reponse(res), T est un attribut de valeur :matchesTable
    res.json({ T: teamsTable });
});
// business logic : Delete team By Id
app.delete("/teams/:id", (req, res) => {
    console.log("here into BL: Delete team By Id", req.params.id);
    let teamId = req.params.id;
    let pos = teamsTable.findIndex((elt) => elt.id == teamId);
    console.log('pos', pos);
    teamsTable.splice(pos, 1);
    res.json(isDeleted = true);
});
// business logic : Get team By Id
// le path est dynamique: path paramétré en utilisant les ":"
app.get("/teams/:id", (req, res) => {
    console.log("here into BL: Get  team By Id", req.params.id);
    let teamId = req.params.id;
    console.log("team id is", teamId);
    let team = teamsTable.find((elt) => elt.id == teamId);
    console.log("the team :", team);
    res.json({ team: team });
});
// 5) cette  application est exporté : sera importé dans d'autres fichiers : importable
module.exports = app;
