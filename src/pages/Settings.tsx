import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Building, 
  Bell, 
  Lock, 
  Database,
  Save,
  Upload
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('office');

  const tabs = [
    { id: 'office', label: 'بيانات المكتب', icon: Building },
    { id: 'notifications', label: 'التنبيهات', icon: Bell },
    { id: 'security', label: 'الأمان', icon: Lock },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">الإعدادات</h1>
          <p className="text-muted-foreground mt-1">إعدادات النظام والمكتب</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-card rounded-xl shadow-card p-6">
          {activeTab === 'office' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">بيانات المكتب</h3>
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center">
                  <Building className="w-10 h-10 text-muted-foreground" />
                </div>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  رفع الشعار
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    اسم المكتب
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    defaultValue="مكتب المحامي محمد أحمد"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    رقم القيد
                  </label>
                  <input
                    type="text"
                    className="input-field w-full"
                    defaultValue="12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="input-field w-full"
                    defaultValue="info@lawfirm.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    className="input-field w-full"
                    defaultValue="01012345678"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    العنوان
                  </label>
                  <textarea
                    className="input-field w-full"
                    rows={3}
                    defaultValue="الجيزة، الدقي، شارع مصدق، برج المحامين"
                  />
                </div>
              </div>

              <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
                <Save className="w-5 h-5" />
                حفظ التغييرات
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">إعدادات التنبيهات</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">تنبيه الجلسات</h4>
                    <p className="text-sm text-muted-foreground">إرسال تنبيه قبل موعد الجلسة</p>
                  </div>
                  <select className="input-field w-auto">
                    <option>قبل يوم</option>
                    <option>قبل 3 أيام</option>
                    <option>قبل أسبوع</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">تنبيه المستحقات</h4>
                    <p className="text-sm text-muted-foreground">تنبيه عند تأخر الدفع</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-20px]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">تنبيه تحديث القضايا</h4>
                    <p className="text-sm text-muted-foreground">تنبيه عند عدم تحديث قضية</p>
                  </div>
                  <select className="input-field w-auto">
                    <option>بعد 7 أيام</option>
                    <option>بعد 14 يوم</option>
                    <option>بعد 30 يوم</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">إشعارات البريد الإلكتروني</h4>
                    <p className="text-sm text-muted-foreground">إرسال نسخة للبريد</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-20px]"></div>
                  </label>
                </div>
              </div>

              <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
                <Save className="w-5 h-5" />
                حفظ الإعدادات
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">إعدادات الأمان</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    كلمة المرور الحالية
                  </label>
                  <input type="password" className="input-field w-full md:w-1/2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <input type="password" className="input-field w-full md:w-1/2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <input type="password" className="input-field w-full md:w-1/2" />
                </div>
              </div>

              <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                تغيير كلمة المرور
              </button>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">النسخ الاحتياطي</h3>
              
              <div className="p-6 border border-border rounded-xl bg-muted/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">آخر نسخة احتياطية</h4>
                    <p className="text-sm text-muted-foreground">2024-01-14 10:30 صباحاً</p>
                  </div>
                </div>
                <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  إنشاء نسخة احتياطية الآن
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">النسخ الاحتياطي التلقائي</h4>
                  <p className="text-sm text-muted-foreground">إنشاء نسخة احتياطية تلقائياً</p>
                </div>
                <select className="input-field w-auto">
                  <option>يومياً</option>
                  <option>أسبوعياً</option>
                  <option>شهرياً</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
