import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Ej Cine </h1>
      <nav>
        <ul>
          <li><Link href="/movies">Ver películas</Link></li>
          <li><Link href="/actors">Ver actores</Link></li>
        </ul>
      </nav>
    </main>
  );
}
