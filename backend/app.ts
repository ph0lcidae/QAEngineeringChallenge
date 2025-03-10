import express, { Request, Response } from "express";
import { getMachineHealth } from "./machineHealth";
import cors from "cors";

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Fixes CORS issue with backend and native-app
app.use(cors());

// Endpoint to get machine health score
app.post("/machine-health", (req: Request, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
