import { 
  FileBarChart, 
  Download, 
  Printer, 
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  TrendingUp,
  FileText
} from 'lucide-react';

const reportTypes = [
  {
    id: 'cases',
    title: 'تقرير القضايا',
    description: 'تقرير شامل عن جميع القضايا وحالاتها',
    icon: Briefcase,
    color: 'from-primary to-navy-light',
  },
  {
    id: 'sessions',
    title: 'تقرير الجلسات',
    description: 'تقرير تفصيلي عن الجلسات والمواعيد',
    icon: Calendar,
    color: 'from-gold to-gold-light',
  },
  {
    id: 'finance',
    title: 'التقرير المالي',
    description: 'تقرير الإيرادات والمصروفات',
    icon: DollarSign,
    color: 'from-success to-emerald-400',
  },
  {
    id: 'clients',
    title: 'تقرير العملاء',
    description: 'تقرير عن العملاء وتعاملاتهم',
    icon: Users,
    color: 'from-purple-500 to-purple-400',
  },
  {
    id: 'performance',
    title: 'تقرير الأداء',
    description: 'تقرير أداء المحامين والقضايا',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-400',
  },
  {
    id: 'documents',
    title: 'تقرير المستندات',
    description: 'قائمة بجميع المستندات المرفوعة',
    icon: FileText,
    color: 'from-orange-500 to-orange-400',
  },
];

const recentReports = [
  {
    id: 1,
    name: 'تقرير القضايا - يناير 2024',
    type: 'cases',
    date: '2024-01-14',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'التقرير المالي - الربع الأول 2024',
    type: 'finance',
    date: '2024-01-10',
    size: '1.8 MB',
  },
  {
    id: 3,
    name: 'تقرير العملاء - 2023',
    type: 'clients',
    date: '2024-01-05',
    size: '3.2 MB',
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">التقارير</h1>
          <p className="text-muted-foreground mt-1">إنشاء وتصدير التقارير</p>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className="bg-card rounded-xl shadow-card p-6 hover:shadow-hover transition-all cursor-pointer group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <report.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{report.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
            <div className="flex items-center gap-2">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                إنشاء التقرير
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate Custom Report */}
      <div className="bg-card rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <FileBarChart className="w-5 h-5 text-primary" />
          إنشاء تقرير مخصص
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              نوع التقرير
            </label>
            <select className="input-field w-full">
              <option>تقرير القضايا</option>
              <option>تقرير الجلسات</option>
              <option>التقرير المالي</option>
              <option>تقرير العملاء</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              من تاريخ
            </label>
            <input type="date" className="input-field w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              إلى تاريخ
            </label>
            <input type="date" className="input-field w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              صيغة التصدير
            </label>
            <select className="input-field w-full">
              <option>PDF</option>
              <option>Excel</option>
              <option>Word</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
            <FileBarChart className="w-5 h-5" />
            إنشاء التقرير
          </button>
          <button className="px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            تصدير
          </button>
          <button className="px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <Printer className="w-5 h-5" />
            طباعة
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">التقارير الأخيرة</h3>
        </div>
        <div className="divide-y divide-border">
          {recentReports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-muted/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <FileBarChart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{report.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-primary" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Printer className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
