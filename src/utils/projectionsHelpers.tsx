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
  // Debug logging to see what parameters we're getting
  if (years === 40) {
    console.log("40-year calculation:", {
      principal,
      monthlyContribution,
      annualRate,
      timesCompounded,
      years,
    });
  }

  // Future Value of Ordinary Annuity + Compound Interest formula
  // FV = PV(1+r)^n + PMT[((1+r)^n - 1) / r]

  const rate = annualRate / timesCompounded;
  const totalPeriods = timesCompounded * years;

  // Future value of initial principal: PV(1+r)^n
  const principalFV = principal * Math.pow(1 + rate, totalPeriods);

  // Future value of ordinary annuity: PMT[((1+r)^n - 1) / r]
  // Convert monthly contribution to the compounding period frequency
  const periodicPayment = monthlyContribution * (12 / timesCompounded);

  let contributionsFV = 0;
  if (rate === 0) {
    // Handle zero interest rate case
    contributionsFV = periodicPayment * totalPeriods;
  } else {
    contributionsFV =
      periodicPayment * ((Math.pow(1 + rate, totalPeriods) - 1) / rate);
  }

  const total = principalFV + contributionsFV;

  if (years === 40) {
    console.log("40-year result:", {
      principalFV,
      contributionsFV,
      total,
    });
  }

  return total;
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
  let accumulatedExcess = 0; // Track excess investment over time

  for (let i = 0; i <= years; i++) {
    const year = startYear + i;

    if (year === 2025) {
      console.log("=== 2025 DEBUG ===");
    }

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

    // Note: We'll calculate adjusted account amounts later based on income-funded contributions

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

    // Calculate total planned monthly contributions across all accounts
    const totalPlannedContributions =
      accounts.reduce((sum, account) => sum + account.monthlyContribution, 0) *
      12;

    // Calculate available income after expenses
    const availableAfterExpenses = totalIncome - totalExpenses;

    // Determine actual contributions (limited by available income)
    const actualContributions = Math.min(
      totalPlannedContributions,
      Math.max(0, availableAfterExpenses)
    );

    // Calculate contribution ratio (what percentage of planned contributions can be funded)
    const contributionRatio =
      totalPlannedContributions > 0
        ? actualContributions / totalPlannedContributions
        : 0;

    // Recalculate account growth with actual (funded) contributions
    const adjustedChartAccounts: ChartAccount[] = accounts.map((account) => {
      const adjustedMonthlyContribution =
        account.monthlyContribution * contributionRatio;
      const amount = calculateCompoundInterestWithContributions(
        account.amount,
        adjustedMonthlyContribution,
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

    const adjustedTotalAccountAmount = parseFloat(
      adjustedChartAccounts.reduce((sum, acc) => sum + acc.amount, 0).toFixed(2)
    );

    // Calculate excess income after funding contributions
    const excessIncome = Math.max(
      0,
      availableAfterExpenses - actualContributions
    );

    // Add this year's excess to accumulated excess and compound the total
    accumulatedExcess = accumulatedExcess * 1.05 + excessIncome;

    // Net worth = funded account growth + accumulated compounded excess
    const netWorth = parseFloat(
      (adjustedTotalAccountAmount + accumulatedExcess).toFixed(2)
    );

    // Update chartAccounts to use the adjusted values
    chartAccounts.length = 0;
    chartAccounts.push(...adjustedChartAccounts);

    // Calculate net cash flow for reporting (income - expenses)
    const netCashFlow = parseFloat((totalIncome - totalExpenses).toFixed(2));

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
      totalAccountAmount: adjustedTotalAccountAmount,
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
