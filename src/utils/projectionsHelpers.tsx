import type {
  ChartData,
  ChartAccount,
  Account,
  Expense,
  Income,
} from "../../types/types";

/**
 * Calculate compound interest
 *
 * @param principal Initial amount of money invested
 * @param annualRate Annual interest rate (e.g., 0.05 for 5%)
 * @param timesCompounded Number of times interest applied per year (e.g., 12 for monthly)
 * @param years Number of years money is invested for
 * @returns Future value including interest
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  timesCompounded: number,
  years: number
): number {
  const amount =
    principal *
    Math.pow(1 + annualRate / timesCompounded, timesCompounded * years);
  return amount;
}

// /**
//  * Generate compound interest projection data for a single account
//  *
//  * @param accountId Unique ID of the account (e.g., "savings")
//  * @param principal Initial amount invested
//  * @param annualRate Annual interest rate (e.g., 0.05 for 5%)
//  * @param timesCompounded Number of times interest is compounded per year
//  * @param startYear Starting year (e.g., 2025)
//  * @param years Number of years to project (e.g., 5 means 2025–2030)
//  * @returns ChartData[] in the new structure
//  */
// export function getCompoundInterestProjection(
//   accountId: string,
//   principal: number,
//   annualRate: number,
//   timesCompounded: number,
//   startYear: number,
//   years: number
// ): ChartData[] {
//   const data: ChartData[] = [];

//   for (let i = 0; i <= years; i++) {
//     const year = startYear + i;
//     const amount =
//       principal *
//       Math.pow(1 + annualRate / timesCompounded, timesCompounded * i);

//     const chartAccount: ChartAccount = {
//       accountId,
//       amount: parseFloat(amount.toFixed(2)),
//     };

//     data.push({
//       year,
//       chartAccounts: [chartAccount],
//     });
//   }

//   return data;
// }

/**
 * Calculate compound interest with regular monthly contributions
 *
 * @param principal Initial amount of money invested
 * @param monthlyContribution Amount contributed each month
 * @param annualRate Annual interest rate (e.g., 0.05 for 5%)
 * @param timesCompounded Number of times interest applied per year (e.g., 12 for monthly)
 * @param years Number of years money is invested for
 * @returns Future value including interest and contributions
 */
export function calculateCompoundInterestWithContributions(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  timesCompounded: number,
  years: number
): number {
  const monthlyRate = annualRate / timesCompounded;
  const totalPeriods = timesCompounded * years;

  // Future value of initial principal
  const principalFV = principal * Math.pow(1 + monthlyRate, totalPeriods);

  // Future value of monthly contributions (annuity)
  const contributionsFV =
    monthlyContribution *
    ((Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate);

  return principalFV + contributionsFV;
}

/**
 * Calculate only the interest/passive income earned (excluding principal and contributions)
 *
 * @param principal Initial amount of money invested
 * @param monthlyContribution Amount contributed each month
 * @param annualRate Annual interest rate (e.g., 0.05 for 5%)
 * @param timesCompounded Number of times interest applied per year (e.g., 12 for monthly)
 * @param years Number of years money is invested for
 * @returns Interest earned only
 */
export function calculatePassiveIncomeOnly(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  timesCompounded: number,
  years: number
): number {
  const totalFutureValue = calculateCompoundInterestWithContributions(
    principal,
    monthlyContribution,
    annualRate,
    timesCompounded,
    years
  );

  // Total contributions = initial principal + (monthly contribution * months)
  const totalContributions =
    principal + monthlyContribution * timesCompounded * years;

  // Interest earned = total future value - total contributions
  const passiveIncome = totalFutureValue - totalContributions;
  return parseFloat(passiveIncome.toFixed(2));
}

/**
 * Generates compound interest projection for multiple real accounts with monthly contributions
 *
 * @param accounts List of Account objects (with amount, interestRate, monthlyRate, monthlyContribution)
 * @param expenses List of Expense objects to subtract from total account amount
 * @param incomes List of Income objects representing salary, side gigs, etc.
 * @param startYear Starting year
 * @param years Number of years to project
 * @returns ChartData[]
 */
export function getCombinedCompoundProjections(
  accounts: Account[],
  expenses: Expense[],
  incomes: Income[],
  startYear: number,
  years: number
): ChartData[] {
  const chartData: ChartData[] = [];

  for (let i = 0; i <= years; i++) {
    const year = startYear + i;

    const chartAccounts: ChartAccount[] = accounts.map((account) => {
      const amount = calculateCompoundInterestWithContributions(
        account.amount,
        account.monthlyContribution,
        account.interestRate,
        account.monthlyRate,
        i
      );

      return {
        accountId: account.id,
        accountName: account.name,
        amount: parseFloat(amount.toFixed(2)),
      };
    });

    const totalAccountAmount = parseFloat(
      chartAccounts.reduce((sum, acc) => sum + acc.amount, 0).toFixed(2)
    );

    // Calculate total income for this year
    const totalIncome = incomes
      .filter(
        (income) => income.duration.start <= year && income.duration.end >= year
      )
      .reduce((sum, income) => sum + income.amount, 0);

    // Calculate total expenses for this year
    const totalExpenses = expenses
      .filter(
        (expense) =>
          expense.duration.start <= year && expense.duration.end >= year
      )
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate net cash flow (income - expenses)
    const netCashFlow = parseFloat((totalIncome - totalExpenses).toFixed(2));

    // Calculate net worth (account growth + accumulated cash flow)
    // This represents a more realistic net worth that includes cash flow impact
    const netWorth = parseFloat((totalAccountAmount + netCashFlow).toFixed(2));

    // Calculate annual passive income (interest earned in this specific year)
    let totalPassiveIncome = 0;

    if (i === 0) {
      // For the first year, passive income is 0 since no time has passed
      totalPassiveIncome = 0;
    } else {
      // Calculate cumulative passive income for current year
      const currentYearCumulativePassiveIncome = accounts
        .map((account) =>
          calculatePassiveIncomeOnly(
            account.amount,
            account.monthlyContribution,
            account.interestRate,
            account.monthlyRate,
            i
          )
        )
        .reduce((sum, passiveIncome) => sum + passiveIncome, 0);

      // Calculate cumulative passive income for previous year
      const previousYearCumulativePassiveIncome = accounts
        .map((account) =>
          calculatePassiveIncomeOnly(
            account.amount,
            account.monthlyContribution,
            account.interestRate,
            account.monthlyRate,
            i - 1
          )
        )
        .reduce((sum, passiveIncome) => sum + passiveIncome, 0);

      // Annual passive income = difference between current and previous year
      totalPassiveIncome = parseFloat(
        (
          currentYearCumulativePassiveIncome -
          previousYearCumulativePassiveIncome
        ).toFixed(2)
      );
    }

    chartData.push({
      year,
      totalAccountAmount,
      totalPassiveIncome,
      totalIncome,
      totalExpenses,
      netCashFlow,
      netWorth,
      chartAccounts,
    });
  }

  return chartData;
}
