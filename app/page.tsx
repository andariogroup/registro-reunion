import { redirect } from 'next/navigation';

export default async function Home() {
  // Redirigir directamente al registro
  // La página de registro manejará la autenticación si es necesaria
  redirect('/registro');
}
