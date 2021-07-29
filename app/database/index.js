const { MongoClient } = require("mongodb");

const connectionString = `mongodb+srv://admin_user:admin_user@cluster0.e1kqb.mongodb.net/postsDatabase?retryWrites=true&w=majority`;

const connectDatabase = async () => {
  try {
    await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).then(() => console.log("Connected to the database"));
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

module.exports = { connectDatabase };
