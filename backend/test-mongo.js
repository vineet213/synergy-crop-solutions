import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://synergycropsolutions11_db_user:Yyk4NDHYdTDz7WZc@synergy-crop-solutions.wbv2zh1.mongodb.net/?appName=Synergy-Crop-Solutions";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  console.log("CONNECTED");
  await client.db("admin").command({ ping: 1 });
  console.log("PING SUCCESS");
} catch (err) {
  console.error(err);
} finally {
  await client.close();
}