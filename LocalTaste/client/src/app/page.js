import Header from '@/components/layout/Header'


export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Header />
      <h1 className="text-4xl font-bold">Welcome to LocalTaste!</h1>
    </main>
  );
}
