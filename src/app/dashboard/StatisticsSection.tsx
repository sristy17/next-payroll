'use client';

import {
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
} from 'recharts';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

enum TimePeriod {
    Weekly = 'weekly',
    Monthly = 'monthly',
    Yearly = 'yearly',
}

enum Month {
    Jan = 'Jan',
    Feb = 'Feb',
    Mar = 'Mar',
    Apr = 'Apr',
    May = 'May',
    Jun = 'Jun',
    Jul = 'Jul',
    Aug = 'Aug',
    Sep = 'Sep',
    Oct = 'Oct',
    Nov = 'Nov',
    Dec = 'Dec',
}

type FinancialRecord = {
    name: string;
    income: number;
    expenses: number;
    savings: number;
};

type PieCategory = {
    name: string;
    value: number;
};

const COLORS = ['#845ef7', '#ef4444', '#10b981', '#facc15', '#3b82f6'];

const generateDataByPeriod = (period: TimePeriod): FinancialRecord[] => {
    if (period === TimePeriod.Weekly) {
        return [
            { name: 'Week 1', income: 200, expenses: 100, savings: 100 },
            { name: 'Week 2', income: 300, expenses: 150, savings: 150 },
            { name: 'Week 3', income: 400, expenses: 200, savings: 200 },
            { name: 'Week 4', income: 974.99, expenses: 425.3, savings: 549.61 },
        ];
    }

    if (period === TimePeriod.Monthly) {
        const months = Object.values(Month);
        return months.map((month, idx) => ({
            name: month,
            income: 700 + idx * 20,
            expenses: 300 + idx * 15,
            savings: 400 + idx * 10,
        }));
    }

    if (period === TimePeriod.Yearly) {
        const currentYear = new Date().getFullYear();
        const startYear = 2020;
        return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
            const year = startYear + i;
            return {
                name: year.toString(),
                income: 900 + i * 50,
                expenses: 400 + i * 30,
                savings: 500 + i * 20,
            };
        });
    }

    return [];
};

const spendingBreakdown: PieCategory[] = [
    { name: 'Housing', value: 150 },
    { name: 'Food', value: 100 },
    { name: 'Entertainment', value: 75 },
    { name: 'Utilities', value: 50 },
    { name: 'Other', value: 50 },
];

const renderCustomLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    percent = 0,
}: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    outerRadius?: number;
    percent?: number;
}) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#333"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function StatisticsSection() {
    const [period, setPeriod] = useState<TimePeriod>(TimePeriod.Weekly);
    const [chartData, setChartData] = useState<FinancialRecord[]>([]);

    useEffect(() => {
        setChartData(generateDataByPeriod(period));
    }, [period]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            {/* Header and Filters */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
                <div className="flex gap-2">
                    {Object.values(TimePeriod).map((p) => (
                        <Button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`capitalize ${period === p
                                ? 'bg-[#15803d] text-white hover:bg-[#166f36]'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {p}
                        </Button>

                    ))}
                </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col gap-6 lg:gap-4">
                {/* Line Chart */}
                <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Income vs Expenses</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#845ef7" strokeWidth={2} />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Area + Pie side-by-side */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Area Chart */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Savings Trend</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="savings"
                                    stroke="#10b981"
                                    fillOpacity={1}
                                    fill="url(#savingsGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <div className="w-full max-w-[350px]">
                            <h3 className="text-md font-semibold text-gray-700 mb-2 text-center">Spending Categories</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={spendingBreakdown}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        label={renderCustomLabel}
                                        labelLine={false}
                                        isAnimationActive
                                    >
                                        {spendingBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
