// listen to requests
// importer un mosule ou bien un fichier
const app=require('./backend/app');
// listen to : http://localhost:3000
// arrow function
app.listen(3000,()=>{console.log('Express server is running on port 3000');});