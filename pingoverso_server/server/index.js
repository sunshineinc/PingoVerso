import { Server } from "colyseus";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { MyGameRoom } from "./rooms/MyGameRoom.js";
import authRoutes from "./auth/routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const gameServer = new Server({ server });

gameServer.define("pingoverso", MyGameRoom);

const PORT = process.env.PORT || 2567;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB conectado.");
  server.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
  });
});