import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { month: 'يناير', income: 45000, expenses: 12000 },
  { month: 'فبراير', income: 52000, expenses: 15000 },
  { month: 'مارس', income: 48000, expenses: 18000 },
  { month: 'أبريل', income: 61000, expenses: 14000 },
  { month: 'مايو', income: 55000, expenses: 16000 },
  { month: 'يونيو', income: 67000, expenses: 20000 },
];

export function FinanceChart() {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          الإيرادات والمصروفات
        </h2>
        <select className="input-field w-auto text-sm">
          <option>آخر 6 أشهر</option>
          <option>آخر سنة</option>
          <option>هذا العام</option>
        </select>
      </div>
      <div className="h-72" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                direction: 'rtl',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} ج.م`, '']}
              labelFormatter={(label) => label}
            />
            <Legend 
              formatter={(value) => value === 'income' ? 'الإيرادات' : 'المصروفات'}
            />
            <Bar 
              dataKey="income" 
              fill="hsl(var(--gold))" 
              radius={[4, 4, 0, 0]}
              name="income"
            />
            <Bar 
              dataKey="expenses" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              name="expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
