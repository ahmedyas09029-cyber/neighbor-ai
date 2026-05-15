import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Heart, MessageCircle, Share2, Flag, MapPin, TrendingUp, Award, 
  Search, Plus, Bell, Settings, LogOut, Home as HomeIcon, Map as MapIcon,
  BarChart3, Zap, Users, AlertTriangle, CheckCircle, Clock
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const CATEGORIES = [
  { id: "safety", label: "Sécurité", icon: "🚨", color: "from-red-500 to-red-600" },
  { id: "infrastructure", label: "Infrastructure", icon: "🏗️", color: "from-blue-500 to-blue-600" },
  { id: "events", label: "Événements", icon: "🎉", color: "from-purple-500 to-purple-600" },
  { id: "community", label: "Communauté", icon: "👥", color: "from-green-500 to-green-600" },
  { id: "business", label: "Affaires", icon: "💼", color: "from-yellow-500 to-yellow-600" },
  { id: "environment", label: "Environnement", icon: "🌱", color: "from-emerald-500 to-emerald-600" },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: "Jean Dupont",
    avatar: "JD",
    category: "safety",
    title: "Nid de poule dangereux rue de la Paix",
    content: "Un nid de poule important a été signalé rue de la Paix, près du carrefour avec l'avenue centrale. Danger pour les cyclistes et motos.",
    likes: 24,
    comments: 8,
    shares: 3,
    sentiment: "negative",
    timestamp: "Il y a 2h",
    verified: true,
    priority: "high",
  },
  {
    id: 2,
    author: "Marie Martin",
    avatar: "MM",
    category: "events",
    title: "Fête de quartier ce weekend !",
    content: "Rejoignez-nous samedi 18h pour la fête annuelle du quartier. Musique live, nourriture locale et animations pour toute la famille. Entrée gratuite !",
    likes: 156,
    comments: 42,
    shares: 28,
    sentiment: "positive",
    timestamp: "Il y a 4h",
    verified: false,
    priority: "low",
  },
  {
    id: 3,
    author: "Pierre Leblanc",
    avatar: "PL",
    category: "infrastructure",
    title: "Travaux de rénovation de la route",
    content: "Les travaux de rénovation de la route principale commenceront lundi 7h. Prévoir des détours. Durée estimée : 3 semaines.",
    likes: 45,
    comments: 15,
    shares: 12,
    sentiment: "neutral",
    timestamp: "Il y a 6h",
    verified: true,
    priority: "medium",
  },
];

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="p-8 bg-slate-800 border-slate-700">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🏘️</div>
              <h1 className="text-3xl font-bold text-white mb-2">Neighbor AI</h1>
              <p className="text-slate-300">Connectez-vous avec votre communauté locale</p>
            </div>
            <p className="text-slate-400 text-sm mb-6 text-center">
              Signalez les problèmes, partagez les événements et collaborez pour améliorer votre quartier.
            </p>
            <Button 
              onClick={() => window.location.href = `${window.location.origin}/api/oauth/login`}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Se connecter
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const filteredPosts = selectedCategory === "all" 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏘️</div>
            <h1 className="text-xl font-bold text-white">Neighbor AI</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-slate-300 hover:text-white flex items-center gap-2">
              <HomeIcon size={20} />
              <span className="hidden sm:inline">Accueil</span>
            </button>
            <button onClick={() => navigate("/map")} className="text-slate-300 hover:text-white flex items-center gap-2">
              <MapIcon size={20} />
              <span className="hidden sm:inline">Carte</span>
            </button>
            <button onClick={() => navigate("/dashboard")} className="text-slate-300 hover:text-white flex items-center gap-2">
              <BarChart3 size={20} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button className="text-slate-300 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="text-slate-300 hover:text-white">
              <Settings size={20} />
            </button>
            <button 
              onClick={logout}
              className="text-slate-300 hover:text-white"
            >
              <LogOut size={20} />
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-6 bg-slate-800 border-slate-700">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white text-lg">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Partagez une mise à jour avec votre quartier..."
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:border-blue-500"
                    rows={3}
                  />
                  <div className="mt-4 flex gap-2 items-center">
                    <select className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                      ))}
                    </select>
                    <Button className="ml-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center gap-2">
                      <Plus size={18} />
                      Publier
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts */}
            {filteredPosts.map(post => (
              <Card key={post.id} className="p-6 bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">{post.author}</span>
                      {post.verified && <CheckCircle size={16} className="text-blue-500" />}
                      <span className={`text-xs px-2 py-1 rounded font-semibold bg-gradient-to-r ${CATEGORIES.find(c => c.id === post.category)?.color}`}>
                        {CATEGORIES.find(c => c.id === post.category)?.icon} {CATEGORIES.find(c => c.id === post.category)?.label}
                      </span>
                      {post.priority === "high" && <AlertTriangle size={16} className="text-red-500" />}
                      <span className="text-xs text-slate-400 ml-auto">{post.timestamp}</span>
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{post.title}</h3>
                    <p className="text-slate-300 mb-4">{post.content}</p>
                    
                    {/* Sentiment & Priority Badges */}
                    <div className="mb-4 flex gap-2">
                      <div className={`text-xs px-2 py-1 rounded font-semibold ${
                        post.sentiment === "positive" ? "bg-green-500/20 text-green-300" :
                        post.sentiment === "negative" ? "bg-red-500/20 text-red-300" :
                        "bg-slate-600/50 text-slate-300"
                      }`}>
                        {post.sentiment === "positive" && "😊 Positif"}
                        {post.sentiment === "negative" && "😟 Négatif"}
                        {post.sentiment === "neutral" && "😐 Neutre"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-6 text-slate-400">
                      <button 
                        onClick={() => {
                          if (likedPosts.includes(post.id)) {
                            setLikedPosts(likedPosts.filter(id => id !== post.id));
                          } else {
                            setLikedPosts([...likedPosts, post.id]);
                          }
                        }}
                        className="flex items-center gap-2 hover:text-red-500 transition"
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}
                        />
                        <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition">
                        <MessageCircle size={18} />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-500 transition">
                        <Share2 size={18} />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-orange-500 transition ml-auto">
                        <Flag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h2 className="font-bold text-lg text-white mb-4">Catégories</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded transition ${selectedCategory === "all" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
                >
                  Tous les posts
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded transition flex items-center gap-2 ${selectedCategory === cat.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"}`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Statistiques
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Posts aujourd'hui</span>
                  <span className="font-bold text-white">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Utilisateurs actifs</span>
                  <span className="font-bold text-white">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Alertes critiques</span>
                  <span className="font-bold text-red-500">3</span>
                </div>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h2 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Award size={20} />
                Top Contributeurs
              </h2>
              <div className="space-y-3">
                {[
                  { name: "Alice Dupont", posts: 24, badge: "⭐" },
                  { name: "Bob Martin", posts: 18, badge: "🔒" },
                  { name: "Charlie Leblanc", posts: 15, badge: "🎤" },
                ].map((contributor, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded transition">
                    <span className="text-xl">{contributor.badge}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{contributor.name}</p>
                      <p className="text-xs text-slate-400">{contributor.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
              <p className="text-white font-semibold mb-2">💡 Conseil du jour</p>
              <p className="text-blue-100 text-sm">
                Signalez les problèmes rapidement pour aider votre communauté à réagir plus vite.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
