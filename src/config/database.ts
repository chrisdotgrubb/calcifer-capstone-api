import {connect, connection} from "mongoose";
import {config} from "dotenv";

config();

const url: string = process.env.DATABASE_URL || "";
connect(url);

const db = connection;

db.on("connected", (): void => {
	console.log(`Connected to Mongodb ${db.name} at ${db.host}:${db.port}`);
});

