'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';

export default function TestPage() {
  const [guestName, setGuestName] = useState('João Silva');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [presetGuests] = useState([
    'João Silva',
    'Maria Santos',
    'Pedro Oliveira',
    'Ana Costa',
    'Carlos Ferreira',
  ]);

  useEffect(() => {
    generateQRCode(guestName);
  }, [guestName]);

  const generateQRCode = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Erro ao gerar QR code:', err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${guestName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Gerar QR Code</h1>
          <p className="text-gray-400">Para testes do scanner</p>
        </div>

        {/* Input de Nome */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Nome do Convidado:</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            placeholder="Digite o nome do convidado"
          />
        </div>

        {/* Botões Pré-definidos */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">Ou escolha um convidado:</p>
          <div className="grid grid-cols-2 gap-2">
            {presetGuests.map((name) => (
              <button
                key={name}
                onClick={() => setGuestName(name)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  guestName === name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Display */}
        {qrCodeUrl && (
          <div className="mb-6 bg-white p-6 rounded-lg">
            <div className="text-center">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto mb-4"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="text-gray-800 font-semibold mb-4">{guestName}</p>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Baixar QR Code
              </button>
            </div>
          </div>
        )}

        {/* Instruções */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Como testar:</h3>
          <ol className="text-sm text-gray-300 space-y-2">
            <li>1. Gere um QR code com um nome de teste</li>
            <li>2. Abra a página principal em outro dispositivo</li>
            <li>3. Aponte a câmera para este QR code na tela</li>
            <li>4. O sistema detectará automaticamente e fará o check-in</li>
          </ol>
        </div>

        {/* Dica */}
        <div className="mb-6 p-4 bg-yellow-900/50 border border-yellow-700 rounded-lg">
          <p className="text-sm text-yellow-200">
            <span className="font-semibold">💡 Dica:</span> Para melhor leitura, aumente o brilho da tela onde o QR code está sendo exibido.
          </p>
        </div>

        {/* Botões de Navegação */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block text-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
          >
            Ir para Scanner
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Página de Testes</p>
        </div>
      </div>
    </div>
  );
}
