import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

export async function GET() {
  try {
    const keypair = Ed25519Keypair.generate();
    const publicKey = keypair.getPublicKey().toBase64();
    const privateKey = keypair.export().privateKey;

    return new Response(JSON.stringify({
      publicKey,
      privateKey,
      filename: `keys-${Date.now()}.json`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro no backend:', error.message, error.stack);
    return new Response(JSON.stringify({ error: `Erro ao gerar chaves: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}