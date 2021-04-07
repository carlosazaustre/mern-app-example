import mongoose from "mongoose";

export default function (uri) {
  mongoose.connection
    .on("connected", () => {
      console.log("DB Connected");
    })
    .on("error", (err) => {
      console.error(err.message);
    })
    .on("disconnected", () => {
      console.log("DB Disconnected");
    });

  process.on("uncaughtException", (err) => {
    console.error(err.message);
    mongoose.disconnect();
  });

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
