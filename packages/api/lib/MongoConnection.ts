import { connect } from 'mongoose';

export async function connectToDB(): Promise<boolean> {
  const connectionString = process.env.MONGO_URL as string;
  if (!connectionString) {
    console.log(`connection string is empty`);
    return false;
  }

  let successConnecting = false;

  await connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log(`connection to url ${connectionString} established !`);
      successConnecting = true;
    })
    .catch((err) => {
      console.log(`connection to url ${connectionString} not established !`);
      console.log(err);
    });

  return successConnecting;
}
