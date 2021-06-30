import Head from 'next/head';
import { Navbar } from '../components/Navbar';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>CollaboWrite</title>
        <meta
          name="description"
          content="Collaborative Article editing with CollaboWrite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
    </div>
  );
}
