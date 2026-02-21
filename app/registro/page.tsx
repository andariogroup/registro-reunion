'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function RegistroPage() {
  const [cedulaColaborador, setCedulaColaborador] = useState('');
  const [cedulaEmpleado, setCedulaEmpleado] = useState('');
  const [colaboradorNombre, setColaboradorNombre] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.colaborador) {
            setColaboradorNombre(data.colaborador.nombre_completo);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  // Login del colaborador
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cedulaColaborador.trim()) {
      toast.error('Por favor, ingresa tu cédula');
      return;
    }

    setLoadingAuth(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ cedula: cedulaColaborador.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Bienvenido, ${data.colaborador.nombre_completo}`);
        setColaboradorNombre(data.colaborador.nombre_completo);
        setIsAuthenticated(true);
        setCedulaColaborador('');
      } else {
        if (response.status === 404) {
          toast.error(data.message || 'Colaborador no encontrado. Debes estar registrado en la hoja Colaboradores.');
        } else {
          toast.error(data.message || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoadingAuth(false);
    }
  };

  // Registrar asistencia del empleado
  const handleBuscarYRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Por favor, inicia sesión primero con tu cédula de colaborador');
      return;
    }

    if (!cedulaEmpleado.trim()) {
      toast.error('Por favor, ingresa la cédula del empleado');
      return;
    }

    setLoading(true);

    try {
      // Primero buscar el empleado
      const buscarResponse = await fetch(`/api/asistencia?cedula=${encodeURIComponent(cedulaEmpleado.trim())}`);
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

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setColaboradorNombre('');
      toast.success('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Registro de Asistencia
              </h1>
              <p className="text-gray-600 mt-1">
                {isAuthenticated 
                  ? `Colaborador: ${colaboradorNombre}`
                  : 'Sistema de registro de asistencia de empleados'
                }
              </p>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>

        {/* Formulario de Login - Solo si no está autenticado */}
        {!isAuthenticated && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Iniciar Sesión
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Debes estar registrado en la hoja &quot;Colaboradores&quot; para poder registrar asistencias.
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="cedulaColaborador"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cédula del Colaborador
                </label>
                <input
                  id="cedulaColaborador"
                  type="text"
                  value={cedulaColaborador}
                  onChange={(e) => setCedulaColaborador(e.target.value)}
                  placeholder="Ingresa tu cédula"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-400"
                  disabled={loadingAuth}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loadingAuth}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loadingAuth ? 'Verificando...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        )}

        {/* Aviso de Bienvenida - Solo si está autenticado */}
        {isAuthenticated && (
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
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm text-green-50">En línea</span>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Registro - Solo si está autenticado */}
        {isAuthenticated && (
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
