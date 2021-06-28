import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>CollaboWrite</title>
        <meta
          name="description"
          content="Collaborative Article editing with Next.JS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Test</p>
    </div>
  );
}