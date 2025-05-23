'use client';

import { useState } from 'react';
import { FaCopy } from 'react-icons/fa'; // Ícone de copiar

export default function HomeComponent() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState({ publicKey: false, privateKey: false });

  async function generateKeys() {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/generate-keys');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Erro no frontend:', error);
      setResult({ error: 'Erro ao conectar com o servidor' });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Gerador de Chaves Sui</h1>
      </header>
      {!result && !isLoading && (
        <p className="intro-text">
          Clique no botão abaixo para gerar suas chaves Sui de forma segura.
        </p>
      )}
      <button
        onClick={generateKeys}
        className="generate-button"
        disabled={isLoading}
      >
        <svg
          className="button-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 12H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-7zm-2-4l4-4m0 4l-4-4" />
        </svg>
        {isLoading ? 'Gerando...' : 'Gerar Chaves'}
      </button>
      <div className={`result ${result ? 'result-enter' : ''}`}>
        {result && (
          <>
            {result.error ? (
              <p className="warning">{result.error}</p>
            ) : (
              <div className="key-container">
                <div className="key-item">
                  <p className="key-text">
                    <strong>Chave Pública:</strong> {result.publicKey}
                  </p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(result.publicKey, 'publicKey')}
                  >
                    <FaCopy /> {copied.publicKey ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <div className="key-item">
                  <p className="key-text">
                    <strong>Chave Privada:</strong> {result.privateKey}
                  </p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(result.privateKey, 'privateKey')}
                  >
                    <FaCopy /> {copied.privateKey ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="filename-text">
                  <strong>Arquivo Simulado:</strong> {result.filename}
                </p>
                <p className="warning">
                  Aviso: A chave privada é sensível! Não compartilhe publicamente.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import styles from './page.module.css';