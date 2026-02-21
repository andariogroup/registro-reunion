'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegistroPage() {
  const [colaboradorNombre, setColaboradorNombre] = useState<string>('');
  const [cedulaEmpleado, setCedulaEmpleado] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay sesión activa
    const checkSession = async () => {
      try {
        // Leer cookies del servidor mediante una llamada
        const response = await fetch('/api/auth', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.colaborador) {
            setColaboradorNombre(data.colaborador.nombre_completo);
            return; // Sesión válida, no hacer nada más
          }
        }
        
        // Si llegamos aquí, no hay sesión válida
        // Solo redirigir si no estamos en proceso de carga inicial
        if (!loadingSession) {
          setColaboradorNombre('');
          router.push('/login');
        } else {
          // En la carga inicial, si no hay sesión, redirigir después de un breve delay
          setTimeout(() => {
            setColaboradorNombre('');
            router.push('/login');
          }, 500);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        // Solo redirigir si no estamos en carga inicial
        if (!loadingSession) {
          setColaboradorNombre('');
          router.push('/login');
        }
      } finally {
        setLoadingSession(false);
      }
    };

    checkSession();

    // Verificar sesión periódicamente cada 60 segundos para mantener el estado actualizado
    const intervalId = setInterval(() => {
      checkSession();
    }, 60000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      toast.success('Sesión cerrada');
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleBuscarYRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cedulaEmpleado.trim()) {
      toast.error('Por favor, ingresa la cédula del empleado');
      return;
    }

    setLoading(true);

    try {
      // Primero buscar el empleado
      const buscarResponse = await fetch(`/api/asistencia?cedula=${encodeURIComponent(cedulaEmpleado.trim())}`, {
        credentials: 'include',
      });
      const buscarData = await buscarResponse.json();

      if (!buscarData.success) {
        toast.error(buscarData.message || 'Empleado no encontrado');
        setCedulaEmpleado('');
        return;
      }

      // Si el empleado existe, actualizar su asistencia
      const actualizarResponse = await fetch('/api/asistencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ cedula: cedulaEmpleado.trim() }),
      });

      const actualizarData = await actualizarResponse.json();

      if (actualizarData.success) {
        toast.success(actualizarData.message);
        setCedulaEmpleado('');
      } else {
        toast.error(actualizarData.message || 'Error al registrar asistencia');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no hay sesión, no mostrar nada (el useEffect redirigirá)
  if (!colaboradorNombre && !loadingSession) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Aviso de Bienvenida - Visible mientras esté logueado */}
        {colaboradorNombre && !loadingSession && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-6 mb-6 text-white animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">¡Bienvenido, {colaboradorNombre}!</h2>
                  <p className="text-green-50 text-sm mt-1">Sesión activa. Puedes comenzar a registrar asistencias.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-50">En línea</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Registro - Siempre visible cuando hay sesión */}
        {colaboradorNombre && !loadingSession && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Registrar Asistencia de Empleado
            </h2>

            <form onSubmit={handleBuscarYRegistrar} className="space-y-6">
              <div>
                <label
                  htmlFor="cedulaEmpleado"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cédula del Empleado
                </label>
                <input
                  id="cedulaEmpleado"
                  type="text"
                  value={cedulaEmpleado}
                  onChange={(e) => setCedulaEmpleado(e.target.value)}
                  placeholder="Ingresa la cédula del empleado"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Registrando...' : 'Registrar Asistencia'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instrucciones:</strong> Ingresa la cédula del empleado y el sistema
                buscará su registro. Si existe, se actualizará automáticamente con la fecha
                y hora actual, marcando su asistencia como &quot;Asistió&quot;.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
