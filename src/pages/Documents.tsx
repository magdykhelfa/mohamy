import { useState } from 'react';
import { 
  Upload, 
  Search, 
  Folder, 
  FileText, 
  Image, 
  File,
  Download,
  Trash2,
  Eye,
  MoreVertical,
  Grid,
  List,
  Filter
} from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'عقد توكيل - أحمد محمد.pdf',
    type: 'pdf',
    size: '2.4 MB',
    case: '2024/1234',
    client: 'أحمد محمد علي',
    uploadDate: '2024-01-10',
    uploadedBy: 'محمد أحمد',
  },
  {
    id: 2,
    name: 'صورة البطاقة.jpg',
    type: 'image',
    size: '1.2 MB',
    case: '2024/1234',
    client: 'أحمد محمد علي',
    uploadDate: '2024-01-10',
    uploadedBy: 'محمد أحمد',
  },
  {
    id: 3,
    name: 'عقد بيع أرض.docx',
    type: 'doc',
    size: '856 KB',
    case: '2024/5678',
    client: 'شركة النور للتجارة',
    uploadDate: '2024-01-08',
    uploadedBy: 'سارة محمد',
  },
  {
    id: 4,
    name: 'حكم المحكمة.pdf',
    type: 'pdf',
    size: '3.1 MB',
    case: '2024/9012',
    client: 'فاطمة إبراهيم',
    uploadDate: '2024-01-05',
    uploadedBy: 'محمد أحمد',
  },
  {
    id: 5,
    name: 'مذكرة دفاع.pdf',
    type: 'pdf',
    size: '1.8 MB',
    case: '2024/3456',
    client: 'محمود حسن',
    uploadDate: '2024-01-03',
    uploadedBy: 'محمد أحمد',
  },
];

const folders = [
  { id: 1, name: 'قضية 2024/1234', count: 12 },
  { id: 2, name: 'قضية 2024/5678', count: 8 },
  { id: 3, name: 'قضية 2024/9012', count: 5 },
  { id: 4, name: 'عقود عامة', count: 23 },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-500" />;
    case 'image':
      return <Image className="w-8 h-8 text-blue-500" />;
    case 'doc':
      return <File className="w-8 h-8 text-blue-600" />;
    default:
      return <File className="w-8 h-8 text-muted-foreground" />;
  }
};

export default function Documents() {
  const [view, setView] = useState<'grid' | 'list'>('list');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">إدارة المستندات</h1>
          <p className="text-muted-foreground mt-1">رفع وتنظيم جميع المستندات</p>
        </div>
        <button className="btn-gold px-6 py-2.5 rounded-lg flex items-center gap-2">
          <Upload className="w-5 h-5" />
          رفع مستند
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-card rounded-xl shadow-card p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">اسحب الملفات هنا أو انقر للرفع</h3>
          <p className="text-sm text-muted-foreground">
            PDF, Word, صور (حد أقصى 25 ميجابايت لكل ملف)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-gold" />
            المجلدات
          </h3>
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-right"
              >
                <div className="flex items-center gap-2">
                  <Folder className="w-5 h-5 text-gold" />
                  <span className="text-sm text-foreground">{folder.name}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {folder.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="lg:col-span-3 bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="بحث في المستندات..."
                  className="input-field pr-9 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select className="input-field w-auto py-2 text-sm">
                <option>جميع الأنواع</option>
                <option>PDF</option>
                <option>Word</option>
                <option>صور</option>
              </select>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 ${view === 'grid' ? 'bg-muted' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 ${view === 'list' ? 'bg-muted' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {view === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      الملف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      القضية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      الحجم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      تاريخ الرفع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="table-row-hover">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">{doc.client}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{doc.case}</td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{doc.uploadDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-primary" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border border-border rounded-xl hover:shadow-card transition-all group"
                >
                  <div className="flex justify-center mb-4">
                    {getFileIcon(doc.type)}
                  </div>
                  <p className="font-medium text-foreground text-sm text-center truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">{doc.size}</p>
                  <div className="flex items-center justify-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-muted rounded-lg">
                      <Eye className="w-4 h-4 text-primary" />
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded-lg">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-destructive/10 rounded-lg">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
