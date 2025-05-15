import * as anchor from "@coral-xyz/anchor";
import { BankrunProvider } from "anchor-bankrun";
import { PublicKey, Keypair } from "@solana/web3.js";
import { startAnchor, ProgramTestContext, BanksClient } from "solana-bankrun";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { BN, Program } from "@coral-xyz/anchor";
import { createMint, mintTo } from "spl-token-bankrun";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

import IDL from "../target/idl/pencil_finance.json";
import { PencilFinance } from "anchor/target/types/pencil_finance";

describe("Vesting Smart Contract Tests", () => {
    const companyName = "Company";
    let lending_company: Keypair;
    let bundleAccountKey: PublicKey;
    let context: ProgramTestContext;
    let provider: BankrunProvider;
    let program: Program<PencilFinance>;
    let banksClient: BanksClient;
    let finance_provider: Keypair;
    let mint: PublicKey;
    let companyProvider: BankrunProvider;
    let program2: Program<PencilFinance>;

    beforeAll(async () => {
        lending_company = new anchor.web3.Keypair();

        context = await startAnchor(
            "",
            [{ name: "pencil_finance", programId: new PublicKey("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H"), }],
            [
                {
                    address: lending_company.publicKey,
                    info: {
                        lamports: 1_000_000_000,
                        data: Buffer.alloc(0),
                        owner: SYSTEM_PROGRAM_ID,
                        executable: false,
                    },
                }
            ]
        )

        provider = new BankrunProvider(context);

        anchor.setProvider(provider);

        program = new Program<PencilFinance>(IDL as PencilFinance, provider);

        banksClient = context.banksClient;

        finance_provider = provider.wallet.payer;

        mint = await createMint(banksClient, finance_provider, finance_provider.publicKey, null, 2);

        companyProvider = new BankrunProvider(context);
        companyProvider.wallet = new NodeWallet(lending_company);

        program2 = new Program<PencilFinance>(IDL as PencilFinance, companyProvider);

        // Derive PDAs
        [bundleAccountKey] = PublicKey.findProgramAddressSync(
            [Buffer.from(companyName)],
            program.programId
        );

        // [treasuryTokenAccount] = PublicKey.findProgramAddressSync(
        //     [Buffer.from("vesting_treasury"), Buffer.from(companyName)],
        //     program.programId
        // );

        // [employeeAccount] = PublicKey.findProgramAddressSync(
        //     [
        //         Buffer.from("employee_vesting"),
        //         beneficiary.publicKey.toBuffer(),
        //         vestingAccountKey.toBuffer(),
        //     ],
        //     program.programId
        // );
    });

    it("Should create a bundle account", async () => {
        const now = Math.floor(Date.now() / 1000);
        const startTime = now + 60; // start in 1 min
        const endTime = now + 3600; // end in 1 hour
        const redemptionTime = now + 7200; // redeem in 2 hours

        const tx = await program.methods.createBundle(
            companyName, // name: string
            new anchor.BN(1_000_000_000), // 1e9 lamports = 1 SOL
            2000, // 50% junior
            8000, // 50% senior
            800, // 8% junior
            500, // 5% senior
            new anchor.BN(startTime),
            new anchor.BN(endTime),
            new anchor.BN(redemptionTime),
            new anchor.BN(300), // 5 min period
            new anchor.BN(500_000_000),
        )
            .accounts({
                lendingCompany: lending_company.publicKey,
                bundleAccount: bundleAccountKey,
                systemProgram: SYSTEM_PROGRAM_ID,
            }).signers([lending_company])
            .rpc({ commitment: "confirmed" });

        const bundleAccountData = await program.account.bundleAccount.fetch(bundleAccountKey, "confirmed");
        console.log(
            "Bundle Account Data:",
            JSON.stringify(bundleAccountData, null, 2)
        );
        console.log("Bundle Created", tx);

    });
});