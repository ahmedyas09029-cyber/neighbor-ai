import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, AlertCircle, Users, MessageSquare } from "lucide-react";

const STATS = [
  { label: "Posts Totaux", value: "1,234", change: "+12%" },
  { label: "Utilisateurs Actifs", value: "456", change: "+8%" },
  { label: "Alertes Critiques", value: "23", change: "-5%" },
  { label: "Engagement", value: "78%", change: "+3%" },
];

const CHART_DATA = [
  { name: "Lun", posts: 40, comments: 24, alerts: 12 },
  { name: "Mar", posts: 30, comments: 13, alerts: 8 },
  { name: "Mer", posts: 20, comments: 9, alerts: 5 },
  { name: "Jeu", posts: 27, comments: 39, alerts: 15 },
  { name: "Ven", posts: 35, comments: 23, alerts: 10 },
  { name: "Sam", posts: 45, comments: 36, alerts: 18 },
  { name: "Dim", posts: 38, comments: 28, alerts: 14 },
];

const CATEGORY_DATA = [
  { name: "Sécurité", value: 35 },
  { name: "Infrastructure", value: 25 },
  { name: "Événements", value: 20 },
  { name: "Communauté", value: 15 },
  { name: "Autres", value: 5 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#C7CEEA"];

const RECENT_ALERTS = [
  { id: 1, title: "Nid de poule rue de la Paix", severity: "high", timestamp: "Il y a 2h", status: "En cours" },
  { id: 2, title: "Feu tricolore défaillant", severity: "high", timestamp: "Il y a 4h", status: "Résolu" },
  { id: 3, title: "Dégradation du mobilier urbain", severity: "medium", timestamp: "Il y a 6h", status: "En cours" },
  { id: 4, title: "Bruits excessifs la nuit", severity: "low", timestamp: "Il y a 8h", status: "Fermé" },
];

export default function MayorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">📊 Dashboard Maire</h1>
          </div>
          <Button variant="outline">Paramètres</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Activity Chart */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="font-bold text-lg mb-4">Activité Hebdomadaire</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="posts" stroke="#FF6B6B" />
                <Line type="monotone" dataKey="comments" stroke="#4ECDC4" />
                <Line type="monotone" dataKey="alerts" stroke="#FFE66D" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h2 className="font-bold text-lg mb-4">Distribution par Catégorie</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-red-500" />
              <h2 className="font-bold text-lg">Alertes Récentes</h2>
            </div>
            <div className="space-y-3">
              {RECENT_ALERTS.map(alert => (
                <div key={alert.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === "high" ? "bg-red-500" :
                    alert.severity === "medium" ? "bg-yellow-500" :
                    "bg-blue-500"
                  }`} />
                  <div className="flex-1">
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${
                    alert.status === "En cours" ? "bg-yellow-100 text-yellow-800" :
                    alert.status === "Résolu" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="font-bold text-lg mb-4">Actions Rapides</h2>
            <div className="space-y-3">
              <Button className="w-full bg-coral-500 hover:bg-coral-600">
                Voir Tous les Posts
              </Button>
              <Button className="w-full bg-mint-500 hover:bg-mint-600">
                Gérer les Alertes
              </Button>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Exporter Rapport
              </Button>
              <Button variant="outline" className="w-full">
                Paramètres
              </Button>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">📈 Résumé</p>
              <p className="text-xs text-gray-600">
                Votre quartier a une excellente engagement. Les alertes de sécurité diminuent de 5% cette semaine.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
