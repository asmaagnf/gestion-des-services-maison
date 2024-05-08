const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");
app.use('/uploads', express.static('uploads'));
//ROUTERS
const usersRouter = require('./routes/UsersRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const categoryRoutes =  require('./routes/categoriesRoutes');
const SubcategoryRoutes =  require('./routes/subcategoriesRoutes');
app.use("/users", usersRouter);
app.use('/api', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', SubcategoryRoutes);
db.sequelize.sync().then(() => {
app.listen(3001, () => {
    console.log("server running");
 });
});