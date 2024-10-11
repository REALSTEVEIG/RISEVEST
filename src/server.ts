import app from './app';
import { AppDataSource } from './config/database';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
      });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
