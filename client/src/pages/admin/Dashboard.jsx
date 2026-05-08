import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { BookOpenCheck, IndianRupee, TrendingUp, Users } from "lucide-react";

const staticRevenueData = [
  { month: "Jan", revenue: 12000, learners: 16 },
  { month: "Feb", revenue: 14500, learners: 19 },
  { month: "Mar", revenue: 18000, learners: 24 },
  { month: "Apr", revenue: 22000, learners: 31 },
  { month: "May", revenue: 26000, learners: 38 },
  { month: "Jun", revenue: 31000, learners: 44 },
];

const formatCurrency = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) {
    return <div className="ui-card rounded-lg p-6 text-muted-foreground">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="ui-card rounded-lg p-6 text-destructive">Failed to get purchased course</div>;
  }

  const { purchasedCourse } = data || { purchasedCourse: [] };
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;
  const avgOrder = totalSales ? Math.round(totalRevenue / totalSales) : 0;

  return (
    <div className="relative w-full space-y-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 w-40 h-40 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-2)_18%,transparent)]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl bg-[color-mix(in_oklch,var(--brand-3)_16%,transparent)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-sm font-medium text-muted-foreground">Instructor overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Administrator Dashboard</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      >
        <MetricCard title="Total Sales" value={totalSales} helper="Courses purchased" icon={BookOpenCheck} />
        <MetricCard title="Total Revenue" value={formatCurrency(totalRevenue)} helper="All-time course sales" icon={IndianRupee} />
        <MetricCard title="Average Order" value={formatCurrency(avgOrder)} helper="Revenue per purchase" icon={TrendingUp} />
        <MetricCard title="Learner Signals" value={staticRevenueData.at(-1).learners} helper="Sample monthly learners" icon={Users} />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        <Card className="p-0">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">Revenue Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Sample monthly data until backend analytics are available.
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={staticRevenueData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--brand)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `Rs. ${value / 1000}k`}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [formatCurrency(value), "Revenue"]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--brand)"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                  animationDuration={850}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">Learner Pattern</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly learner movement.</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staticRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="learners" fill="var(--brand-2)" radius={[6, 6, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  borderRadius: "0.5rem",
  border: "1px solid var(--border)",
  fontSize: 12,
};

const MetricCard = ({ title, value, helper, icon: Icon }) => (
  <Card className="p-0">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
        {title}
      </CardTitle>
      <span className="rounded-md bg-secondary p-2 text-secondary-foreground">
        <Icon size={18} />
      </span>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-black text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{helper}</p>
    </CardContent>
  </Card>
);

export default Dashboard;
