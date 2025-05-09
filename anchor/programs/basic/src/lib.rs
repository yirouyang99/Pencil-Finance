use anchor_lang::prelude::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod pencil_finance {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_bundle_token(
        ctx: Context<CreateBundleToken>,
        loan_amount: u64,
        tranche_ratios: u8,
        interest_rate: u8,
        lock_up_period: u32,
    ) -> Result<()> {
        let bundle = &mut ctx.accounts.bundle_account;
        bundle.loan_amount = loan_amount;
        bundle.tranche_ratios = tranche_ratios;
        bundle.interest_rate = interest_rate;
        bundle.lock_up_period = lock_up_period;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
#[derive(InitSpace)]
pub struct BundleAccount {
    pub loan_amount: u64,
    pub tranche_ratios: u8,
    pub interest_rate: u8,
    pub lock_up_period: u32,
}

#[derive(Accounts)]
pub struct CreateBundleToken<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    pub bundle_account: Account<'info, BundleAccount>,
}
