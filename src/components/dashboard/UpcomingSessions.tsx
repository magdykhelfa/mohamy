import { Calendar, Clock, MapPin, User } from 'lucide-react';

const sessions = [
  {
    id: 1,
    caseNumber: '2024/1234',
    client: 'أحمد محمد علي',
    court: 'محكمة الجيزة الابتدائية',
    date: '2024-01-15',
    time: '10:00',
    type: 'جلسة مرافعة',
    status: 'today',
  },
  {
    id: 2,
    caseNumber: '2024/5678',
    client: 'شركة النور للتجارة',
    court: 'محكمة القاهرة الاقتصادية',
    date: '2024-01-16',
    time: '11:30',
    type: 'جلسة نطق بالحكم',
    status: 'tomorrow',
  },
  {
    id: 3,
    caseNumber: '2024/9012',
    client: 'فاطمة إبراهيم',
    court: 'محكمة الأسرة',
    date: '2024-01-18',
    time: '09:00',
    type: 'جلسة صلح',
    status: 'upcoming',
  },
  {
    id: 4,
    caseNumber: '2024/3456',
    client: 'محمود حسن',
    court: 'محكمة الجنايات',
    date: '2024-01-20',
    time: '10:30',
    type: 'جلسة استماع',
    status: 'upcoming',
  },
];

const statusStyles = {
  today: 'bg-destructive/10 text-destructive border-destructive/20',
  tomorrow: 'bg-warning/10 text-warning border-warning/20',
  upcoming: 'bg-primary/10 text-primary border-primary/20',
};

const statusLabels = {
  today: 'اليوم',
  tomorrow: 'غداً',
  upcoming: 'قريباً',
};

export function UpcomingSessions() {
  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          الجلسات القادمة
        </h2>
        <button className="text-sm text-primary hover:underline">عرض الكل</button>
      </div>
      <div className="divide-y divide-border">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    قضية رقم {session.caseNumber}
                  </span>
                  <span className={`badge-status border ${statusStyles[session.status]}`}>
                    {statusLabels[session.status]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {session.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {session.court}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium">{session.type}</p>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{session.date}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
