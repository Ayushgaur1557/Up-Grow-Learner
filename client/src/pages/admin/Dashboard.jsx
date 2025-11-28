// src/pages/admin/Dashboard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const staticRevenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 31000 },
];

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse } = data || { purchasedCourse: [] };

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="relative w-full">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 w-40 h-40 bg-fuchsia-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/25 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {/* Total Sales */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="shadow-xl bg-slate-950/80 border border-slate-700/80">
            <CardHeader>
              <CardTitle className="text-slate-100 text-sm uppercase tracking-wide">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-fuchsia-300">
                {totalSales}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Number of courses purchased
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl bg-slate-950/80 border border-slate-700/80">
            <CardHeader>
              <CardTitle className="text-slate-100 text-sm uppercase tracking-wide">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-sky-300">
                ₹{totalRevenue}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Overall revenue from course sales
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue trend */}
        <motion.div
          className="shadow-xl bg-slate-950/80 border border-slate-700/80 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-100">
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={staticRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#020617",
                      borderRadius: "0.75rem",
                      border: "1px solid #4b5563",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ stroke: "#a855f7", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-400 mt-3">
                Static sample data for now – plug real monthly revenue when
                backend is ready.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
