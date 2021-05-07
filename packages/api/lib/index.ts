import { app } from './App';

const PORT = parseInt(process.env.PORT as string);

app.listen(PORT, () => console.log(`Server API berjalan pada port ${PORT}`));
