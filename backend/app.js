
import express from "express";
import mongoose from 'mongoose';
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";

const app = express();

app.use(express.json());
// parse all data in json format

app.use("/api/user", router);
// http:localhost/api/user
app.use("/api/blog", blogRouter)
// http:localhost/api/blog


mongoose.set('strictQuery', false);

// mongodb://localhost:27017/zblog
mongoose
    .connect("mongodb://127.0.0.1:27017/zblog")
    .catch((error) => {
        return console.log(error);
    })
    .then(console.log("Data base connected to 127.0.0.1:5000!"))
    .catch((err0r) => {
        return console.log(err0r);
    });


app.listen(5000);
