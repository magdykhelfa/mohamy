import { useState } from 'react';
import { Plus, Search, Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

const sessions = [
  {
    id: 1,
    date: '2024-01-15',
    time: '10:00',
    caseNumber: '2024/1234',
    caseTitle: 'قضية نزاع ملكية',
    client: 'أحمد محمد علي',
    court: 'محكمة الجيزة الابتدائية',
    type: 'مرافعة',
    status: 'upcoming',
    notes: 'تقديم مذكرة دفاع',
  },
  {
    id: 2,
    date: '2024-01-15',
    time: '11:30',
    caseNumber: '2024/5678',
    caseTitle: 'قضية شيك بدون رصيد',
    client: 'شركة النور للتجارة',
    court: 'محكمة الجنح المستأنفة',
    type: 'نطق بالحكم',
    status: 'upcoming',
    notes: '',
  },
  {
    id: 3,
    date: '2024-01-16',
    time: '09:00',
    caseNumber: '2024/9012',
    caseTitle: 'قضية نفقة',
    client: 'فاطمة إبراهيم',
    court: 'محكمة الأسرة',
    type: 'صلح',
    status: 'upcoming',
    notes: 'محاولة صلح ثانية',
  },
  {
    id: 4,
    date: '2024-01-10',
    time: '10:30',
    caseNumber: '2024/3456',
    caseTitle: 'قضية تعويض',
    client: 'محمود حسن',
    court: 'محكمة شمال القاهرة',
    type: 'استماع',
    status: 'completed',
    decision: 'تأجيل لجلسة 25/1',
    notes: 'طلب المدعى عليه التأجيل',
  },
];

const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export default function Sessions() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });

  const getSessionsForDay = (day: number) => {
    const dateStr = `2024-01-${day.toString().padStart(2, '0')}`;
    return sessions.filter(s => s.date === dateStr);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">الجلسات والمواعيد</h1>
          <p className="text-muted-foreground mt-1">تتبع جميع الجلسات والمواعيد القانونية</p>
        </div>
        <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          جلسة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">{monthName}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-24" />;
              }

              const daySessions = getSessionsForDay(day);
              const isToday = day === 15;
              const hasSession = daySessions.length > 0;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(`2024-01-${day.toString().padStart(2, '0')}`)}
                  className={`h-24 p-2 rounded-lg border transition-all duration-200 text-right ${
                    isToday
                      ? 'bg-primary text-primary-foreground border-primary'
                      : hasSession
                      ? 'bg-gold/10 border-gold/30 hover:border-gold'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <span className={`text-sm font-medium ${isToday ? '' : 'text-foreground'}`}>
                    {day}
                  </span>
                  {hasSession && (
                    <div className="mt-1 space-y-1">
                      {daySessions.slice(0, 2).map((session) => (
                        <div
                          key={session.id}
                          className={`text-xs px-1.5 py-0.5 rounded truncate ${
                            isToday ? 'bg-white/20' : 'bg-gold/20 text-gold'
                          }`}
                        >
                          {session.time}
                        </div>
                      ))}
                      {daySessions.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{daySessions.length - 2} أخرى
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border bg-primary text-primary-foreground">
            <h3 className="font-semibold">جلسات اليوم</h3>
            <p className="text-sm opacity-80">15 يناير 2024</p>
          </div>
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {sessions.filter(s => s.date === '2024-01-15').map((session) => (
              <div key={session.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-foreground">{session.caseNumber}</span>
                  <span className="badge-status bg-gold/10 text-gold">{session.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{session.caseTitle}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {session.court}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Sessions List */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">جميع الجلسات</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="بحث..."
                className="input-field pr-9 py-2 text-sm w-64"
              />
            </div>
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
                  الوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  القضية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  المحكمة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sessions.map((session) => (
                <tr key={session.id} className="table-row-hover cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{session.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{session.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">{session.caseNumber}</span>
                    <p className="text-sm text-muted-foreground">{session.caseTitle}</p>
                  </td>
                  <td className="px-6 py-4 text-foreground">{session.client}</td>
                  <td className="px-6 py-4 text-foreground text-sm">{session.court}</td>
                  <td className="px-6 py-4">
                    <span className="badge-status bg-primary/10 text-primary">{session.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge-status ${
                      session.status === 'completed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {session.status === 'completed' ? 'منتهية' : 'قادمة'}
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
