const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post')

const app = express();

///middlewares
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());

//for routing
app.use('/posts', postRoutes);



//connecting to cloud atlas database and listening on port 
const CONNECTION_URL = 'mongodb+srv://ernisty:@cluster0.d4f3b.mongodb.net/<dbname>?retryWrites=true&w=majority';


const PORT = process.env.port || 3001;

mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
