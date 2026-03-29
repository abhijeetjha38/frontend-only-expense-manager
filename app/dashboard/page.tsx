"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SUMMARY_CARDS = [
  {
    title: "Total Balance",
    value: "$24,563.00",
    change: "+2.5%",
    positive: true,
  },
  {
    title: "Monthly Income",
    value: "$8,350.00",
    change: "+12.3%",
    positive: true,
  },
  {
    title: "Monthly Expenses",
    value: "$3,820.00",
    change: "-4.1%",
    positive: true,
  },
  {
    title: "Savings Rate",
    value: "54.2%",
    change: "+3.8%",
    positive: true,
  },
];

const RECENT_TRANSACTIONS = [
  { id: 1, description: "Grocery Store", category: "Food", amount: -82.50, date: "Today" },
  { id: 2, description: "Salary Deposit", category: "Income", amount: 4175.00, date: "Today" },
  { id: 3, description: "Electric Bill", category: "Utilities", amount: -124.00, date: "Yesterday" },
  { id: 4, description: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Yesterday" },
  { id: 5, description: "Freelance Payment", category: "Income", amount: 850.00, date: "Dec 18" },
  { id: 6, description: "Gas Station", category: "Transport", amount: -45.20, date: "Dec 17" },
  { id: 7, description: "Restaurant", category: "Food", amount: -67.80, date: "Dec 17" },
];

const BUDGET_ITEMS = [
  { category: "Housing", spent: 1200, budget: 1500, color: "bg-blue-500" },
  { category: "Food", spent: 480, budget: 600, color: "bg-green-500" },
  { category: "Transport", spent: 180, budget: 300, color: "bg-yellow-500" },
  { category: "Entertainment", spent: 95, budget: 150, color: "bg-purple-500" },
  { category: "Utilities", spent: 220, budget: 250, color: "bg-orange-500" },
];

const MONTHLY_SPENDING = [
  { month: "Jul", amount: 3200 },
  { month: "Aug", amount: 2900 },
  { month: "Sep", amount: 3500 },
  { month: "Oct", amount: 3100 },
  { month: "Nov", amount: 3400 },
  { month: "Dec", amount: 3820 },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  const maxSpending = Math.max(...MONTHLY_SPENDING.map((m) => m.amount));

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-4 w-4 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-foreground">FinanceHub</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Welcome, <span className="font-medium text-foreground">Admin</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY_CARDS.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{card.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span
                  className={`text-xs font-medium ${
                    card.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.change} from last month
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Middle Row: Chart + Budget */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending</CardTitle>
              <CardDescription>Last 6 months overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 pt-2" style={{ height: 180 }}>
                {MONTHLY_SPENDING.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      ${(item.amount / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full rounded-t-md bg-primary/80 transition-all"
                      style={{
                        height: `${(item.amount / maxSpending) * 130}px`,
                      }}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>December spending vs. budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {BUDGET_ITEMS.map((item) => {
                  const pct = Math.round((item.spent / item.budget) * 100);
                  return (
                    <div key={item.category}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {item.category}
                        </span>
                        <span className="text-muted-foreground">
                          ${item.spent} / ${item.budget}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {RECENT_TRANSACTIONS.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          tx.amount > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {tx.amount > 0 ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 13l-5 5m0 0l-5-5m5 5V6"
                            />
                          )}
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {tx.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tx.category} · {tx.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      ${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
