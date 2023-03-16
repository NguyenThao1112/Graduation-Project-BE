const express = require('express');
const urls = require('./constants/urlConstants');
const configs = require('./constants/configConstants');

//Routers
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes'); 

const app = express();

const rootUrl = urls.ROOT_API_URL;

app.use(express.json());
app.use(`${rootUrl}${urls.AUTH_PREFIX_API_URL}`, authRoutes);
app.use(`${rootUrl}${urls.MENTOR_PREFIX_API_URL}`, mentorRoutes);

app.listen(configs.APP_PORT, () => {
    console.log(`Server is serving on port ${configs.APP_PORT}`);
})