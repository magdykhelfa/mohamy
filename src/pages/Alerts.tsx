import { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  FileText,
  Clock,
  CheckCircle,
  X,
  Settings,
  Filter
} from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'session',
    title: 'جلسة غداً',
    description: 'قضية رقم 2024/1234 - محكمة الجيزة الابتدائية',
    date: '2024-01-15',
    time: '10:00',
    priority: 'high',
    read: false,
  },
  {
    id: 2,
    type: 'session',
    title: 'جلسة بعد 3 أيام',
    description: 'قضية رقم 2024/9012 - محكمة الأسرة',
    date: '2024-01-18',
    time: '09:00',
    priority: 'medium',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    title: 'مستحقات متأخرة',
    description: 'العميل أحمد محمد - مبلغ 15,000 ج.م متأخر 30 يوم',
    priority: 'high',
    read: false,
  },
  {
    id: 4,
    type: 'case',
    title: 'قضية بدون تحديث',
    description: 'قضية رقم 2024/3456 لم يتم تحديثها منذ 15 يوم',
    priority: 'medium',
    read: true,
  },
  {
    id: 5,
    type: 'document',
    title: 'انتهاء توكيل',
    description: 'توكيل العميل شركة النور ينتهي بعد 7 أيام',
    date: '2024-01-22',
    priority: 'high',
    read: false,
  },
  {
    id: 6,
    type: 'session',
    title: 'تذكير بجلسة الأسبوع القادم',
    description: 'قضية رقم 2024/7890 - محكمة شمال القاهرة',
    date: '2024-01-20',
    time: '11:30',
    priority: 'low',
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'session':
      return Calendar;
    case 'payment':
      return DollarSign;
    case 'case':
      return AlertTriangle;
    case 'document':
      return FileText;
    default:
      return Bell;
  }
};

const priorityStyles = {
  high: 'border-r-4 border-r-destructive bg-destructive/5',
  medium: 'border-r-4 border-r-warning bg-warning/5',
  low: 'border-r-4 border-r-muted bg-muted/30',
};

const priorityLabels = {
  high: 'عاجل',
  medium: 'متوسط',
  low: 'عادي',
};

const priorityBadgeStyles = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-muted text-muted-foreground',
};

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'session' | 'payment' | 'case'>('all');
  const unreadCount = alerts.filter(a => !a.read).length;

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.read;
    return alert.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">التنبيهات</h1>
          <p className="text-muted-foreground mt-1">
            لديك {unreadCount} تنبيهات غير مقروءة
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            إعدادات التنبيهات
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            filter === 'unread' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          غير مقروء
          <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        </button>
        <button
          onClick={() => setFilter('session')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            filter === 'session' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          <Calendar className="w-4 h-4" />
          الجلسات
        </button>
        <button
          onClick={() => setFilter('payment')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            filter === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          المستحقات
        </button>
        <button
          onClick={() => setFilter('case')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            filter === 'case' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          القضايا
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = getIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`bg-card rounded-xl shadow-card p-4 ${priorityStyles[alert.priority]} ${
                !alert.read ? 'ring-1 ring-primary/20' : ''
              } transition-all hover:shadow-hover`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  alert.priority === 'high' ? 'bg-destructive/10' :
                  alert.priority === 'medium' ? 'bg-warning/10' : 'bg-muted'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    alert.priority === 'high' ? 'text-destructive' :
                    alert.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${!alert.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {alert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge-status ${priorityBadgeStyles[alert.priority]}`}>
                        {priorityLabels[alert.priority]}
                      </span>
                      <button className="p-1 hover:bg-muted rounded-lg transition-colors">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  {(alert.date || alert.time) && (
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      {alert.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {alert.date}
                        </span>
                      )}
                      {alert.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {alert.time}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">لا توجد تنبيهات</h3>
          <p className="text-muted-foreground">ستظهر التنبيهات الجديدة هنا</p>
        </div>
      )}
    </div>
  );
}
