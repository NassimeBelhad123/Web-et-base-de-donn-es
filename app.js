const express = require('express');
const bodyParser = require('body-parser')

const professeursRoutes = require("./routes/professeurs-routes")
const etudiantsRoutes = require("./routes/etudiants-routes")
const coursRoutes = require("./routes/cours-routes")

const HTTPErreur = require("./models/http-erreur");

const app = express();

app.use(bodyParser.json());

app.use("/api/professeurs", professeursRoutes);
app.use("/api/etudiants", etudiantsRoutes);
app.use("/apip/cours", coursRoutes)

app.use((requete, reponse, next) =>{

    return next(new HTTPErreur("Route non trouvée", 404));

});

app.use((error, requete, reponse, next) =>{
    if(reponse.headerSent){
        return next(error);
    }
    reponse.status(error.code || 500);
    reponse.json({message: error.message || "Une erreur inconnue est survenue"});


})


app.listen(5000)





