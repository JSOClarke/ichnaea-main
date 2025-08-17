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
  const totalContributions =
    principal + monthlyContribution * timesCompounded * years;
  return round(totalFutureValue - totalContributions);
}

// Helper function to convert any amount to annual
export function toAnnualAmount(
  amount: number,
  frequency: "monthly" | "annually"
): number {
  return frequency === "monthly" ? amount * 12 : amount;
}

function sumForYear(
  items: {
    duration: { start: number; end: number };
    amount: number;
    frequency: "monthly" | "annually";
  }[],
  year: number
): number {
  return items
    .filter((item) => item.duration.start <= year && item.duration.end >= year)
    .reduce(
      (sum, item) => sum + toAnnualAmount(item.amount, item.frequency),
      0
    );
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
  availableAnnualCash: number,
  currentAccountBalances: { [accountId: string]: number } = {}
): {
  accountId: string;
  accountName: string;
  actualMonthlyContribution: number;
  annualFundedAmount: number;
  fundingPercent: number;
  savingsWithdrawn: number;
  original: Account;
}[] {
  const sorted = [...accounts].sort((a, b) => a.priority - b.priority);
  let remainingCash = availableAnnualCash;
  const results: any[] = [];

  let overflowAccount: Account | null = null;

  // Handle positive cash flow (funding accounts)
  if (availableAnnualCash >= 0) {
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
        savingsWithdrawn: 0,
        original: acc,
      });
    }

    // Handle overflow account
    if (overflowAccount) {
      const remainingForOverflow = Math.max(0, remainingCash);
      results.push({
        accountId: overflowAccount.id,
        accountName: overflowAccount.name,
        actualMonthlyContribution: remainingForOverflow / 12,
        annualFundedAmount: remainingForOverflow,
        fundingPercent: remainingForOverflow > 0 ? 1 : 0,
        savingsWithdrawn: 0,
        original: overflowAccount,
      });
    }
  } else {
    // Handle negative cash flow (consuming savings by withdrawal priority)
    let shortfall = Math.abs(availableAnnualCash);

    // Sort by withdrawal priority for consumption (lower withdrawalPriority = consumed first)
    // Include ALL accounts in withdrawal logic - excess money needs to be tracked somewhere
    const withdrawalSorted = [...accounts].sort(
      (a, b) => (a.withdrawalPriority || 1) - (b.withdrawalPriority || 1)
    );

    // Debug: Log withdrawal order
    console.log(
      "Withdrawal order:",
      withdrawalSorted.map((acc) => ({
        name: acc.name,
        withdrawalPriority: acc.withdrawalPriority || 1,
        balance: currentAccountBalances[acc.id] || acc.amount,
      }))
    );

    // Process withdrawals in withdrawal priority order
    for (const acc of withdrawalSorted) {
      const currentBalance = currentAccountBalances[acc.id] || acc.amount;
      let withdrawn = 0;

      // Consume from this account if there's still a shortfall
      if (shortfall > 0) {
        const maxWithdrawal = Math.min(shortfall, currentBalance);
        withdrawn = maxWithdrawal;
        shortfall -= withdrawn;
      }

      results.push({
        accountId: acc.id,
        accountName: acc.name,
        actualMonthlyContribution: -withdrawn / 12, // Negative contribution = withdrawal
        annualFundedAmount: -withdrawn,
        fundingPercent: 0,
        savingsWithdrawn: withdrawn,
        original: acc,
      });
    }
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

  // Track current account balances over time
  let currentAccountBalances: { [accountId: string]: number } = {};

  // Initialize account balances
  accounts.forEach((acc) => {
    currentAccountBalances[acc.id] = acc.amount;
  });

  for (let i = 0; i <= years; i++) {
    const year = startYear + i;

    const totalIncome = sumForYear(incomes, year);
    const totalExpenses = sumForYear(expenses, year);
    const netCashFlow = totalIncome - totalExpenses; // Allow negative values

    const fundingAllocations = allocateFundsByPriority(
      accounts,
      netCashFlow,
      currentAccountBalances
    );

    const adjustedChartAccounts: ChartAccount[] = fundingAllocations.map(
      (f) => {
        // Calculate the new balance after contributions/withdrawals
        const previousBalance =
          currentAccountBalances[f.accountId] || f.original.amount;

        // For year 0, start with original amount, then apply growth and contributions
        let newAmount;
        if (i === 0) {
          newAmount = previousBalance + f.actualMonthlyContribution * 12;
        } else {
          // Apply compound growth to previous balance, then add/subtract contributions
          const grownBalance =
            previousBalance * Math.pow(1 + f.original.interestRate, 1);
          newAmount = grownBalance + f.actualMonthlyContribution * 12;
        }

        // Ensure balance doesn't go negative
        newAmount = Math.max(0, newAmount);

        // Update the tracked balance
        currentAccountBalances[f.accountId] = newAmount;

        return {
          accountId: f.accountId,
          accountName: f.accountName,
          amount: round(newAmount),
          fundedMonthlyContribution: round(f.actualMonthlyContribution),
          fundedAnnualContribution: round(f.annualFundedAmount),
          fundingPercent: round(f.fundingPercent),
          savingsWithdrawn: round(f.savingsWithdrawn || 0),
        };
      }
    );

    const adjustedTotalAccountAmount = round(
      adjustedChartAccounts.reduce((sum, acc) => sum + acc.amount, 0)
    );

    // Handle excess cash differently for positive vs negative cash flow
    if (netCashFlow >= 0) {
      const totalFunded = fundingAllocations.reduce(
        (sum, f) => sum + Math.max(0, f.annualFundedAmount), // Only count positive funding
        0
      );
      const unusedCash = Math.max(0, netCashFlow - totalFunded);
      accumulatedExcess = accumulatedExcess * 1.05 + unusedCash;
    } else {
      // For negative cash flow, excess cash might be consumed
      const totalWithdrawn = fundingAllocations.reduce(
        (sum, f) => sum + f.savingsWithdrawn,
        0
      );

      // If withdrawals don't cover the shortfall, consume excess cash
      const remainingShortfall = Math.abs(netCashFlow) - totalWithdrawn;
      if (remainingShortfall > 0) {
        accumulatedExcess = Math.max(0, accumulatedExcess - remainingShortfall);
      }

      // Apply growth to remaining excess
      accumulatedExcess = accumulatedExcess * 1.05;
    }

    const netWorth = round(adjustedTotalAccountAmount + accumulatedExcess);

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
      netCashFlow: round(netCashFlow),
      netWorth,
      chartAccounts: adjustedChartAccounts,
    });
  }

  return chartData;
}
