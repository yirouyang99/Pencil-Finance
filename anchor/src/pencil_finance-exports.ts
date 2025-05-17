// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import PencilFinanceIDL from '../target/idl/pencil_finance.json'
import type { PencilFinance } from '../target/types/pencil_finance'

// Re-export the generated IDL and type
export { PencilFinance, PencilFinanceIDL }

// The programId is imported from the program IDL.
export const PENCIL_FINANCE_PROGRAM_ID = new PublicKey(PencilFinanceIDL.address)

// This is a helper function to get the Basic Anchor program.
export function getPencilFinanceProgram(provider: AnchorProvider, address?: PublicKey): Program<PencilFinance> {
  return new Program({ ...PencilFinanceIDL, address: address ? address.toBase58() : PencilFinanceIDL.address } as PencilFinance, provider)
}

// This is a helper function to get the program ID for the Basic program depending on the cluster.
export function getPencilFinanceProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
      return new PublicKey('6yovnUkuEdNBGgxqDzUgQLkGg75h2zDQsNwG6Zipp5ML')
    case 'testnet':
      // This is the program ID for the Basic program on devnet and testnet.
      return new PublicKey('6yovnUkuEdNBGgxqDzUgQLkGg75h2zDQsNwG6Zipp5ML')
    case 'mainnet-beta':
    default:
      return PENCIL_FINANCE_PROGRAM_ID
  }
}
