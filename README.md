# Event Check-in - Sistema de QR Code

Sistema de check-in para eventos usando leitura de QR codes pela câmera do smartphone.

## Funcionalidades

- ✅ Scanner de QR code otimizado para mobile (iPhone/Android)
- ✅ Gerador de QR codes de teste
- ✅ Interface mobile-first responsiva
- ✅ Feedback visual e tátil (vibração)
- ✅ Prevenção de leituras duplicadas

## Como usar

1. **Gerar QR codes**: Acesse `/test` para gerar QR codes de teste
2. **Scanner**: Página principal (`/`) para escanear os QR codes

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Deploy

Este projeto foi otimizado para deploy no Vercel com HTTPS (necessário para acesso à câmera).

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- @yudiel/react-qr-scanner
- qrcode

## Próximos passos

- [ ] Integração com banco de dados
- [ ] Sistema de autenticação para admin
- [ ] Upload de lista de convidados
- [ ] Envio de QR codes por email
- [ ] Relatórios de check-in
