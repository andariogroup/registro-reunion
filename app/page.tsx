import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const colaboradorNombre = cookieStore.get('colaborador_nombre')?.value;

  if (colaboradorNombre) {
    redirect('/registro');
  } else {
    redirect('/login');
  }
}
