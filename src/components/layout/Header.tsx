import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [notifications] = useState([
    { id: 1, text: 'جلسة قضية رقم 123 غداً', type: 'warning' },
    { id: 2, text: 'مستحقات غير مدفوعة من العميل أحمد', type: 'error' },
    { id: 3, text: 'تم إضافة مستند جديد', type: 'info' },
  ]);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="بحث عن قضية، عميل، أو جلسة..."
            className="input-field pr-10 w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative group">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 left-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </button>

          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">التنبيهات</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                  <p className="text-sm text-foreground">{notif.text}</p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <button className="text-sm text-primary hover:underline w-full text-center">
                عرض جميع التنبيهات
              </button>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3 pr-4 border-r border-border">
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">محمد أحمد</p>
            <p className="text-xs text-muted-foreground">مدير المكتب</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-navy-light flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
