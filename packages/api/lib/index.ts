import { app } from './App';
import { connectToDB } from './MongoConnection';

connectToDB().then((success) => {
  if (success) {
    const PORT = parseInt(process.env.PORT as string);
    app.listen(PORT, () =>
      console.log(`Server API berjalan pada port ${PORT}`)
    );
  }
});
