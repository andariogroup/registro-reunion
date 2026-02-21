'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cedula.trim()) {
      toast.error('Por favor, ingresa tu cédula');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ cedula: cedula.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Bienvenido, ${data.colaborador.nombre_completo}`);
        // Esperar un momento antes de redirigir para que la cookie se establezca
        setTimeout(() => {
          window.location.href = '/registro';
        }, 300);
      } else {
        // Manejar diferentes códigos de estado
        if (response.status === 404) {
          toast.error(data.message || 'Colaborador no encontrado');
        } else if (response.status === 400) {
          toast.error(data.message || 'Datos inválidos');
        } else {
          toast.error(data.message || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Registro de Asistencia
          </h1>
          <p className="text-gray-600">
            Inicia sesión con tu cédula
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="cedula"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cédula
            </label>
            <input
              id="cedula"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingresa tu cédula"
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
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
