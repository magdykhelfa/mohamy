import { Briefcase, Users, Calendar, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { UpcomingSessions } from '@/components/dashboard/UpcomingSessions';
import { RecentCases } from '@/components/dashboard/RecentCases';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { FinanceChart } from '@/components/dashboard/FinanceChart';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">مرحباً بك، محمد أحمد</p>
        </div>
        <div className="text-left">
          <p className="text-sm text-muted-foreground">آخر تحديث</p>
          <p className="text-sm font-medium text-foreground">منذ 5 دقائق</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="animate-slide-up opacity-0 delay-100">
          <StatCard
            title="إجمالي القضايا"
            value={156}
            icon={Briefcase}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
        </div>
        <div className="animate-slide-up opacity-0 delay-200">
          <StatCard
            title="القضايا النشطة"
            value={42}
            icon={Briefcase}
            variant="gold"
          />
        </div>
        <div className="animate-slide-up opacity-0 delay-300">
          <StatCard
            title="العملاء"
            value={89}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        <div className="animate-slide-up opacity-0 delay-400">
          <StatCard
            title="جلسات اليوم"
            value={3}
            icon={Calendar}
            variant="warning"
          />
        </div>
        <div className="animate-slide-up opacity-0 delay-500">
          <StatCard
            title="المستحقات"
            value="125,000"
            subtitle="ج.م"
            icon={DollarSign}
            variant="danger"
          />
        </div>
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '600ms' }}>
          <StatCard
            title="قضايا بدون تحديث"
            value={7}
            icon={AlertTriangle}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingSessions />
        <FinanceChart />
      </div>

      {/* Recent Cases */}
      <RecentCases />
    </div>
  );
}
