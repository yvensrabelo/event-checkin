'use client';

import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

interface QRScannerProps {
  onScan: (result: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar permissão da câmera
    async function checkPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      } catch (err) {
        console.error('Erro ao acessar câmera:', err);
        setHasPermission(false);
        setError('Permissão de câmera negada. Por favor, habilite o acesso à câmera nas configurações.');
      }
    }

    checkPermission();
  }, []);

  const handleScan = (detectedCodes: any) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      onScan(result);

      // Vibrar quando detectar QR code
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const handleError = (error: any) => {
    console.error('Erro no scanner:', error);
    setError('Erro ao acessar a câmera. Verifique as permissões.');
  };

  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
        <p className="text-white">Verificando permissões...</p>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-900 rounded-lg p-4">
        <p className="text-white text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white text-red-900 rounded-lg font-semibold"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black">
      <Scanner
        onScan={handleScan}
        onError={handleError}
        constraints={{
          facingMode: 'environment',
          aspectRatio: 1,
        }}
        styles={{
          container: {
            width: '100%',
            height: '100%',
          },
        }}
        allowMultiple={false}
      />

      {/* Overlay com bordas para guiar o usuário */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-4 border-white/30 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-green-500 rounded-lg"></div>
      </div>
    </div>
  );
}
