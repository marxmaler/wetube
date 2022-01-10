import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000; //환경 변수에 PORT라는 변수 없으면 자동으로 4000 값이 들어감(즉, heroku가 아닌 경우 4000이 port값이 됨)

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
