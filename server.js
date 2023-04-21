//Dependencies
const express = require('express');
const routeAPI = require('./routes/routeAPI');
const routeHTML = require('./routes/routeHTML');


//create an enviromental variable port
const PORT = process.env.PORT || 3001;
const app = express();

//variables for api and index routes



app.use(express.static('public'));

// create req.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(routeAPI);
app.use(routeHTML);


//app listener
app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));
