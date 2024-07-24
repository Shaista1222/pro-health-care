const mongoose = require("mongoose");
//useNewUrlParser: Set to true to use the new MongoDB connection string parser. useUnifiedTopology: Set to true to use the new Server Discovery and Monitoring engine
const DBConnection = async () => {
    await mongoose
        .connect("mongodb://127.0.0.1:27017/Hospital_Managmenet", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log("connected to the database..")
        })
        .catch((err) => console.error("mongoose is not connected", err));
}
module.exports = DBConnection;