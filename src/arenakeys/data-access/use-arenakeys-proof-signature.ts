import { getAddMemoInstruction } from '@solana-program/memo'
import {
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
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

export function useArenaKeysProofSignature({
  account,
  metadata,
}: {
  account: UiWalletAccount
  metadata: ArenaKeyMetadata
}) {
  const client = useSolanaClient()
  const [signature, setSignature] = useState<string>()
  const [isSigning, setIsSigning] = useState(false)
  const transactionSigner = useWalletUiSigner({ account })

  async function signDevnetProof() {
    setIsSigning(true)
    try {
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (transactionMessage) => setTransactionMessageFeePayerSigner(transactionSigner, transactionMessage),
        (transactionMessage) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transactionMessage),
        (transactionMessage) =>
          appendTransactionMessageInstruction(
            getAddMemoInstruction({ memo: `ArenaKeys 089 proof: ${metadata.name}` }),
            transactionMessage,
          ),
      )

      assertIsTransactionMessageWithSingleSendingSigner(message)
      const signatureBytes = await signAndSendTransactionMessageWithSigners(message)
      const nextSignature = getBase58Decoder().decode(signatureBytes)
      setSignature(nextSignature)

      return nextSignature
    } finally {
      setIsSigning(false)
    }
  }

  return { isSigning, signature, signDevnetProof }
}
