import { Plus, UserPlus, Calendar, FileText, DollarSign, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  {
    id: 'new-case',
    label: 'قضية جديدة',
    icon: Plus,
    path: '/cases/new',
    color: 'from-primary to-navy-light',
  },
  {
    id: 'new-client',
    label: 'عميل جديد',
    icon: UserPlus,
    path: '/clients/new',
    color: 'from-gold to-gold-light',
  },
  {
    id: 'new-session',
    label: 'جلسة جديدة',
    icon: Calendar,
    path: '/sessions/new',
    color: 'from-success to-emerald-400',
  },
  {
    id: 'new-document',
    label: 'رفع مستند',
    icon: FileText,
    path: '/documents/upload',
    color: 'from-purple-500 to-purple-400',
  },
  {
    id: 'new-payment',
    label: 'تسجيل دفعة',
    icon: DollarSign,
    path: '/finance/new',
    color: 'from-blue-500 to-blue-400',
  },
  {
    id: 'new-alert',
    label: 'تنبيه جديد',
    icon: Bell,
    path: '/alerts/new',
    color: 'from-orange-500 to-orange-400',
  },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">إجراءات سريعة</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.path}
            className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${action.color} text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
          >
            <action.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
