import type {
  ChartData,
  ChartAccount,
  Account,
  Expense,
  Income,
} from "../../types/types";

function round(value: number): number {
  return parseFloat(value.toFixed(2));
}

function calculateCompoundInterestWithContributions(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  timesCompounded: number,
  years: number
): number {
  const rate = annualRate / timesCompounded;
  const totalPeriods = timesCompounded * years;
  const principalFV = principal * Math.pow(1 + rate, totalPeriods);
  const periodicPayment = monthlyContribution * (12 / timesCompounded);

  const contributionsFV =
    rate === 0
      ? periodicPayment * totalPeriods
      : periodicPayment * ((Math.pow(1 + rate, totalPeriods) - 1) / rate);

  return principalFV + contributionsFV;
}

function calculatePassiveIncomeOnly(
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
  const totalContributions =
    principal + monthlyContribution * timesCompounded * years;
  return round(totalFutureValue - totalContributions);
}

function sumForYear(
  items: { duration: { start: number; end: number }; amount: number }[],
  year: number
): number {
  return items
    .filter((item) => item.duration.start <= year && item.duration.end >= year)
    .reduce((sum, item) => sum + item.amount, 0);
}

function calculateTotalPassiveIncome(
  accounts: Account[],
  year: number
): number {
  return accounts
    .map((acc) =>
      calculatePassiveIncomeOnly(
        acc.amount,
        acc.monthlyContribution,
        acc.interestRate,
        acc.monthlyRate,
        year
      )
    )
    .reduce((sum, val) => sum + val, 0);
}

function allocateFundsByPriority(
  accounts: Account[],
  availableAnnualCash: number
): {
  accountId: string;
  accountName: string;
  actualMonthlyContribution: number;
  annualFundedAmount: number;
  fundingPercent: number;
  original: Account;
}[] {
  const sorted = [...accounts].sort((a, b) => a.priority - b.priority);
  let remainingCash = availableAnnualCash;
  const results: any[] = [];

  let overflowAccount: Account | null = null;

  for (const acc of sorted) {
    if ((acc as any).isOverflow) {
      overflowAccount = acc;
      continue;
    }

    const annualTarget = acc.monthlyContribution * 12;
    const annualFunded = Math.min(annualTarget, remainingCash);
    const fundingPercent = annualTarget > 0 ? annualFunded / annualTarget : 0;
    const monthlyFunded = annualFunded / 12;

    remainingCash -= annualFunded;

    results.push({
      accountId: acc.id,
      accountName: acc.name,
      actualMonthlyContribution: monthlyFunded,
      annualFundedAmount: annualFunded,
      fundingPercent,
      original: acc,
    });
  }

  // Always add overflow account, even with 0 funding
  if (overflowAccount) {
    const remainingForOverflow = Math.max(0, remainingCash);
    results.push({
      accountId: overflowAccount.id,
      accountName: overflowAccount.name,
      actualMonthlyContribution: remainingForOverflow / 12,
      annualFundedAmount: remainingForOverflow,
      fundingPercent: remainingForOverflow > 0 ? 1 : 0,
      original: overflowAccount,
    });
  }

  return results;
}

export function getCombinedCompoundProjections(
  accounts: Account[],
  expenses: Expense[],
  incomes: Income[],
  startYear: number,
  years: number
): ChartData[] {
  const chartData: ChartData[] = [];
  let accumulatedExcess = 0;

  for (let i = 0; i <= years; i++) {
    const year = startYear + i;

    const totalIncome = sumForYear(incomes, year);
    const totalExpenses = sumForYear(expenses, year);
    const availableCash = Math.max(0, totalIncome - totalExpenses);

    const fundingAllocations = allocateFundsByPriority(accounts, availableCash);

    const adjustedChartAccounts: ChartAccount[] = fundingAllocations.map(
      (f) => {
        const amount = calculateCompoundInterestWithContributions(
          f.original.amount,
          f.actualMonthlyContribution,
          f.original.interestRate,
          f.original.monthlyRate,
          i
        );

        return {
          accountId: f.accountId,
          accountName: f.accountName,
          amount: round(amount),
          fundedMonthlyContribution: round(f.actualMonthlyContribution),
          fundedAnnualContribution: round(f.annualFundedAmount),
          fundingPercent: round(f.fundingPercent),
        };
      }
    );

    const adjustedTotalAccountAmount = round(
      adjustedChartAccounts.reduce((sum, acc) => sum + acc.amount, 0)
    );

    const totalFunded = fundingAllocations.reduce(
      (sum, f) => sum + f.annualFundedAmount,
      0
    );
    const unusedCash = availableCash - totalFunded;

    accumulatedExcess = accumulatedExcess * 1.05 + unusedCash;

    const netWorth = round(adjustedTotalAccountAmount + accumulatedExcess);
    const netCashFlow = round(totalIncome - totalExpenses);

    const totalPassiveIncome =
      i === 0
        ? 0
        : round(
            calculateTotalPassiveIncome(accounts, i) -
              calculateTotalPassiveIncome(accounts, i - 1)
          );

    chartData.push({
      year,
      totalAccountAmount: adjustedTotalAccountAmount,
      totalPassiveIncome,
      totalIncome,
      totalExpenses,
      netCashFlow,
      netWorth,
      chartAccounts: adjustedChartAccounts,
    });
  }

  return chartData;
}
