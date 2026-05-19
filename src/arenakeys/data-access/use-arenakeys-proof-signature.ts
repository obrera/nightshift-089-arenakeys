import {
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  generateKeyPairSigner,
  getBase58Decoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
} from '@solana/kit'
import { type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import { useSolanaClient } from '@/solana/data-access/use-solana-client'

import type { ArenaKeyMetadata } from '../util/arenakeys-domain'

import { getArenaKeyCreateInstruction } from './arenakeys-mint'

export interface ArenaKeyMintProof {
  assetAddress: string
  signature: string
}

export function useArenaKeysProofSignature({
  account,
  metadata,
}: {
  account: UiWalletAccount
  metadata: ArenaKeyMetadata
}) {
  const client = useSolanaClient()
  const [proof, setProof] = useState<ArenaKeyMintProof>()
  const [isSigning, setIsSigning] = useState(false)
  const transactionSigner = useWalletUiSigner({ account })

  async function signDevnetProof() {
    setIsSigning(true)
    try {
      const asset = await generateKeyPairSigner()
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
      const createInstruction = getArenaKeyCreateInstruction({
        asset,
        metadata,
        payer: transactionSigner,
      })
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (transactionMessage) => setTransactionMessageFeePayerSigner(transactionSigner, transactionMessage),
        (transactionMessage) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transactionMessage),
        (transactionMessage) => appendTransactionMessageInstruction(createInstruction, transactionMessage),
      )

      assertIsTransactionMessageWithSingleSendingSigner(message)
      const signatureBytes = await signAndSendTransactionMessageWithSigners(message)
      const nextProof = {
        assetAddress: asset.address,
        signature: getBase58Decoder().decode(signatureBytes),
      }
      setProof(nextProof)

      return nextProof
    } finally {
      setIsSigning(false)
    }
  }

  return { isSigning, proof, signDevnetProof }
}
