import HomeComponent from './HomeComponent';

// Página principal como Server Component
export default function Page() {
  return <HomeComponent />;
}

// Garante que a página seja tratada como dinâmica
export const dynamic = 'force-dynamic';