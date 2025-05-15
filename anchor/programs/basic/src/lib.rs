use anchor_lang::prelude::*;

declare_id!("JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H");

#[program]
pub mod pencil_finance {
    use super::*;

    pub fn create_bundle(
        ctx: Context<CreateBundle>,
        name: String,
        total_amount: u64,
        junior_ratio: u16,
        senior_ratio: u16,
        junior_rate: u16,
        senior_rate: u16,
        start_time: i64,
        end_time: i64,
        redemption_time: i64,
        junior_period: i64,
        min_funding_threshold: u64,
    ) -> Result<()> {
        let bundle = &mut ctx.accounts.bundle_account;
        require!(
            junior_ratio + senior_ratio == 10_000,
            RwaError::InvalidRatio
        );
        require!(
            start_time > Clock::get()?.unix_timestamp,
            RwaError::InvalidStartTime
        );
        require!(end_time > start_time, RwaError::InvalidEndTime);
        require!(redemption_time >= end_time, RwaError::InvalidRedemptionTime);
        require!(junior_period > 0, RwaError::InvalidJuniorPeriod);
        require!(
            min_funding_threshold > 0 && min_funding_threshold <= total_amount,
            RwaError::InvalidThreshold
        );

        bundle.name = name;
        bundle.status = BundleStatus::Upcoming;
        bundle.lending_company = ctx.accounts.lending_company.key();
        bundle.total_amount = total_amount;
        bundle.raised_amount = 0;
        bundle.junior_ratio = junior_ratio;
        bundle.senior_ratio = senior_ratio;
        bundle.junior_rate = junior_rate;
        bundle.senior_rate = senior_rate;
        bundle.start_time = start_time;
        bundle.end_time = end_time;
        bundle.redemption_time = redemption_time;
        bundle.approved = false;
        bundle.is_active = true;
        bundle.junior_period = junior_period;
        bundle.min_funding_threshold = min_funding_threshold;
        bundle.last_status_update_time = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[account]
pub struct BundleAccount {
    pub name: String,
    pub status: BundleStatus,
    pub lending_company: Pubkey,
    pub total_amount: u64,
    pub raised_amount: u64,
    pub junior_ratio: u16,
    pub senior_ratio: u16,
    pub junior_rate: u16,
    pub senior_rate: u16,
    pub start_time: i64,
    pub end_time: i64,
    pub redemption_time: i64,
    pub approved: bool,
    pub is_active: bool,
    pub junior_period: i64,
    pub min_funding_threshold: u64,
    pub last_status_update_time: i64,
}

impl BundleAccount {
    const INIT_SPACE: usize =
        50 + (1 + 1) + 32 + 8 + 8 + 2 + 2 + 2 + 2 + 8 + 8 + 8 + 1 + 1 + 8 + 8 + 8;
}

#[derive(Accounts)]
#[instruction(company_name: String)]
pub struct CreateBundle<'info> {
    #[account(mut)]
    pub lending_company: Signer<'info>,
    #[account(
        init, 
        seeds = [company_name.as_ref()],
        bump,
        payer = lending_company, 
        space = 8 + BundleAccount::INIT_SPACE
    )]
    pub bundle_account: Account<'info, BundleAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum BundleStatus {
    Upcoming,
    Raising,
    Active,
    FinalRedemption,
    Completed,
    Failed,
}

#[error_code]
pub enum RwaError {
    #[msg("Junior and Senior ratios must sum to 100% (10000 basis points)")]
    InvalidRatio,
    #[msg("Start time must be in the future")]
    InvalidStartTime,
    #[msg("End time must be after start time")]
    InvalidEndTime,
    #[msg("Redemption time must be after end time")]
    InvalidRedemptionTime,
    #[msg("Junior period must be positive")]
    InvalidJuniorPeriod,
    #[msg("Invalid funding threshold")]
    InvalidThreshold,
}
