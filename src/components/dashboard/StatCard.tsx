import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'gold' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-to-br from-primary to-navy-light text-primary-foreground',
  gold: 'bg-gradient-to-br from-gold to-gold-light text-navy-dark',
  success: 'bg-gradient-to-br from-success to-emerald-400 text-white',
  warning: 'bg-gradient-to-br from-warning to-amber-400 text-navy-dark',
  danger: 'bg-gradient-to-br from-destructive to-red-400 text-white',
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const isColored = variant !== 'default';

  return (
    <div className={`stat-card ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${isColored ? 'opacity-80' : 'text-muted-foreground'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${isColored ? '' : 'text-foreground'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-sm mt-1 ${isColored ? 'opacity-70' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className={isColored ? 'opacity-70' : 'text-muted-foreground'}>من الشهر الماضي</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${
          isColored ? 'bg-white/20' : 'bg-primary/10'
        }`}>
          <Icon className={`w-6 h-6 ${isColored ? '' : 'text-primary'}`} />
        </div>
      </div>
      <Icon className={`stat-card-icon ${isColored ? 'text-white' : 'text-primary'}`} />
    </div>
  );
}
