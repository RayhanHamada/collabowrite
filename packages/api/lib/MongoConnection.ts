import { connect } from 'mongoose';

export async function connectToDB(): Promise<boolean> {
  const connectionString = process.env.MONGO_URL;
  let success = false;

  await connect('connectionString', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log(`connection to url ${connectionString} established !`);
      success = true;
    })
    .catch((err) => {
      console.log(`connection to url ${connectionString} not established !`);
      console.log(err);
    });

  return success;
}
