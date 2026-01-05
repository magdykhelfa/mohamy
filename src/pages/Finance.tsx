import { useState } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'يناير', income: 85000, expenses: 22000 },
  { month: 'فبراير', income: 92000, expenses: 25000 },
  { month: 'مارس', income: 78000, expenses: 18000 },
  { month: 'أبريل', income: 110000, expenses: 30000 },
  { month: 'مايو', income: 95000, expenses: 26000 },
  { month: 'يونيو', income: 125000, expenses: 35000 },
];

const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'دفعة من العميل أحمد محمد - قضية 2024/1234',
    amount: 15000,
    date: '2024-01-14',
    status: 'completed',
  },
  {
    id: 2,
    type: 'expense',
    description: 'رسوم قيد قضية جديدة',
    amount: 2500,
    date: '2024-01-13',
    status: 'completed',
  },
  {
    id: 3,
    type: 'income',
    description: 'أتعاب استشارة قانونية',
    amount: 5000,
    date: '2024-01-12',
    status: 'completed',
  },
  {
    id: 4,
    type: 'expense',
    description: 'مصاريف انتقال - محكمة المنصورة',
    amount: 800,
    date: '2024-01-11',
    status: 'completed',
  },
  {
    id: 5,
    type: 'income',
    description: 'دفعة مقدمة - شركة النور',
    amount: 50000,
    date: '2024-01-10',
    status: 'pending',
  },
];

const pieData = [
  { name: 'أتعاب', value: 450000, color: 'hsl(var(--gold))' },
  { name: 'استشارات', value: 120000, color: 'hsl(var(--primary))' },
  { name: 'توثيق', value: 80000, color: 'hsl(var(--success))' },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'income' | 'expenses'>('overview');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">الإدارة المالية</h1>
          <p className="text-muted-foreground mt-1">تتبع الإيرادات والمصروفات</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
          <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            معاملة جديدة
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card bg-gradient-to-br from-success to-emerald-400 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">إجمالي الإيرادات</p>
              <p className="text-3xl font-bold mt-2">585,000</p>
              <p className="text-sm opacity-70">ج.م هذا العام</p>
            </div>
            <div className="p-3 rounded-xl bg-white/20">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+18%</span>
            <span className="opacity-70">من العام الماضي</span>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-destructive to-red-400 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">إجمالي المصروفات</p>
              <p className="text-3xl font-bold mt-2">156,000</p>
              <p className="text-sm opacity-70">ج.م هذا العام</p>
            </div>
            <div className="p-3 rounded-xl bg-white/20">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-sm">
            <ArrowDownRight className="w-4 h-4" />
            <span>-5%</span>
            <span className="opacity-70">من العام الماضي</span>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-gold to-gold-light text-navy-dark">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">صافي الربح</p>
              <p className="text-3xl font-bold mt-2">429,000</p>
              <p className="text-sm opacity-70">ج.م هذا العام</p>
            </div>
            <div className="p-3 rounded-xl bg-white/30">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-primary to-navy-light text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">المستحقات</p>
              <p className="text-3xl font-bold mt-2">125,000</p>
              <p className="text-sm opacity-70">ج.م غير محصلة</p>
            </div>
            <div className="p-3 rounded-xl bg-white/20">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">الإيرادات والمصروفات الشهرية</h3>
          <div className="h-72" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} ج.م`, '']}
                />
                <Bar dataKey="income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="الإيرادات" />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="المصروفات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">توزيع الإيرادات</h3>
          <div className="h-64" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} ج.م`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.value.toLocaleString()} ج.م
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">آخر المعاملات</h3>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="بحث..."
              className="input-field pr-9 py-2 text-sm w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  الوصف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="table-row-hover">
                  <td className="px-6 py-4 text-foreground">{tx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{tx.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge-status ${
                      tx.type === 'income' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {tx.type === 'income' ? 'إيراد' : 'مصروف'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      tx.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()} ج.م
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge-status ${
                      tx.status === 'completed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {tx.status === 'completed' ? 'مكتمل' : 'معلق'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
