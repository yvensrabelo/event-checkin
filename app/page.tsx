'use client';

import { useState } from 'react';
import QRScanner from '@/components/QRScanner';
import Link from 'next/link';

export default function HomePage() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastScanTime, setLastScanTime] = useState<number>(0);

  const handleScan = (result: string) => {
    // Evitar múltiplas leituras do mesmo QR code em rápida sucessão
    const now = Date.now();
    if (now - lastScanTime < 2000) {
      return; // Ignorar se foi lido há menos de 2 segundos
    }
    setLastScanTime(now);

    setScannedResult(result);
    setStatus('success');

    // Resetar após 3 segundos
    setTimeout(() => {
      setStatus('idle');
      setScannedResult(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Event Check-in</h1>
          <p className="text-gray-400">Escaneie o QR code do convidado</p>
        </div>

        {/* Scanner */}
        <div className="mb-6">
          <QRScanner onScan={handleScan} />
        </div>

        {/* Status Display */}
        {status === 'success' && scannedResult && (
          <div className="mb-6 p-6 bg-green-600 rounded-lg shadow-lg animate-pulse">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Check-in Realizado!</h2>
              <div className="bg-white/20 rounded p-3 mt-4">
                <p className="text-sm text-gray-200 mb-1">Convidado:</p>
                <p className="text-lg font-semibold">{scannedResult}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {status === 'idle' && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Instruções:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Posicione o QR code dentro da área verde</li>
              <li>• Mantenha a câmera estável</li>
              <li>• O check-in será automático ao detectar o código</li>
            </ul>
          </div>
        )}

        {/* Test Link */}
        <div className="text-center">
          <Link
            href="/test"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Gerar QR Code de Teste
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Sistema de Check-in v1.0</p>
        </div>
      </div>
    </div>
  );
}
