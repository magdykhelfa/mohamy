import { useState, useEffect } from 'react';
import { Bell, Calendar, DollarSign, Clock, X, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // سحب البيانات من المخزن
    const cases = JSON.parse(localStorage.getItem('lawyer_cases') || '[]');
    const transactions = JSON.parse(localStorage.getItem('lawyer_transactions') || '[]');
    const systemAlerts: any[] = [];
    
    // التاريخ بتاع النهاردة بالظبط
    const today = new Date().toISOString().split('T')[0];

    // 1. فحص الجلسات
    cases.forEach((c: any) => {
      // بنجيب أي تاريخ موجود في القضية (سواء جلسة قادمة أو تاريخ مسجل)
      const sDate = c.nextSession || c.sessionDate || c.date;
      
      // لو التاريخ هو النهاردة (زي ما إنت مدخله) هنظهره فوراً كتنبيه عاجل
      if (sDate === today) {
        systemAlerts.push({
          id: `case-${c.id}`,
          type: 'session',
          title: '⚖️ جلسة اليوم الآن',
          description: `قضية رقم: ${c.number || '---'} | محكمة: ${c.court || 'غير محدد'}`,
          date: sDate,
          time: c.time || '10:00',
          priority: 'high'
        });
      } 
      // لو مفيش تاريخ خالص، نبه المحامي إنه يضيف موعد
      else if (!sDate) {
        systemAlerts.push({
          id: `warn-${c.id}`,
          type: 'case',
          title: '⚠️ قضية بدون تحديث',
          description: `قضية رقم ${c.number || 'جديدة'} لم يتم تحديد موعد جلسة لها`,
          priority: 'medium'
        });
      }
    });

    // 2. فحص المستحقات (لو فيه مليم واحد باقي)
    transactions.forEach((tx: any) => {
      const remaining = parseFloat(tx.remaining || 0);
      if (remaining > 0) {
        systemAlerts.push({
          id: `pay-${tx.id}`,
          type: 'payment',
          title: '💰 مستحقات مالية',
          description: `العميل: ${tx.client} | متبقي عليه: ${remaining} ج.م`,
          priority: 'high'
        });
      }
    });

    setAlerts(systemAlerts);
  }, []);

  const filtered = alerts.filter(a => filter === 'all' ? true : a.type === filter);

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border-2 border-gold/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-arabic text-navy-dark">مركز التنبيهات</h1>
          <p className="text-sm text-muted-foreground mt-1">لديك ({alerts.length}) تنبيهات تحتاج انتباهك</p>
        </div>
        <div className="p-3 bg-gold/10 rounded-full">
          <Bell className="w-8 h-8 text-gold" />
        </div>
      </div>

      {/* الفلترة */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[{id:'all', n:'الكل'}, {id:'session', n:'الجلسات'}, {id:'payment', n:'المستحقات'}, {id:'case', n:'القضايا'}].map(t => (
          <button 
            key={t.id} 
            onClick={() => setFilter(t.id)} 
            className={`px-6 py-2 rounded-xl text-xs font-bold border-2 transition-all ${filter === t.id ? 'bg-gold text-white border-gold shadow-md' : 'bg-white hover:border-gold'}`}
          >
            {t.n}
          </button>
        ))}
      </div>

      {/* قائمة التنبيهات */}
      <div className="grid gap-3">
        {filtered.length > 0 ? filtered.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-xl p-5 border-r-[6px] shadow-sm flex items-start gap-4 hover:bg-slate-50 transition-colors ${alert.priority === 'high' ? 'border-r-red-600' : 'border-r-amber-500'}`}>
            <div className={`p-3 rounded-lg ${alert.type === 'session' ? 'bg-blue-100 text-blue-600' : alert.type === 'payment' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
              {alert.type === 'session' ? <Calendar className="w-6 h-6" /> : alert.type === 'payment' ? <DollarSign className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-navy-dark">{alert.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 font-medium">{alert.description}</p>
                </div>
                <button onClick={() => {setAlerts(alerts.filter(a => a.id !== alert.id)); toast.success('تم إخفاء التنبيه');}} className="text-slate-300 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {alert.date && (
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md text-[11px] font-bold text-navy-dark border">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {alert.date}
                  </span>
                  {alert.time && (
                    <span className="text-[11px] font-bold text-gold bg-gold/5 px-3 py-1 rounded-md border border-gold/10">
                      الساعة: {alert.time}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-3xl border-4 border-dashed border-slate-100">
            <Bell className="w-16 h-16 mx-auto mb-4 text-slate-200 opacity-20" />
            <p className="text-slate-400 font-bold">لا يوجد تنبيهات حالياً في هذا القسم</p>
          </div>
        )}
      </div>
    </div>
  );
}