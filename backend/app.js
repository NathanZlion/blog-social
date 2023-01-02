
import express from "express";
import mongoose from 'mongoose';
import router from "./routes/user-routes";

const app = express();

app.use(express.json());
// parse all data in json format

app.use("/api/user", router);
// http:localhost/api/user


mongoose.set('strictQuery', false);

// mongodb://localhost:27017/zblog
mongoose
    .connect("mongodb://127.0.0.1:27017/zblog")
    .catch((err) => {
        return console.log(err);
    })
    .then(console.log("Data base connected to 127.0.0.1:5000!"))
    .catch((err) => {
        return console.log(err);
    });


app.listen(5000);
