import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Heart, MessageCircle, Share2, Flag, MapPin, TrendingUp, Award } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { useLocation } from "wouter";

const CATEGORIES = [
  { id: "safety", label: "🚨 Sécurité", color: "bg-red-100 text-red-800" },
  { id: "infrastructure", label: "🏗️ Infrastructure", color: "bg-blue-100 text-blue-800" },
  { id: "events", label: "🎉 Événements", color: "bg-purple-100 text-purple-800" },
  { id: "community", label: "👥 Communauté", color: "bg-green-100 text-green-800" },
  { id: "business", label: "💼 Affaires", color: "bg-yellow-100 text-yellow-800" },
  { id: "environment", label: "🌱 Environnement", color: "bg-emerald-100 text-emerald-800" },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: "Jean Dupont",
    category: "safety",
    title: "Nid de poule dangereux rue de la Paix",
    content: "Un nid de poule important a été signalé rue de la Paix, près du carrefour avec l'avenue centrale.",
    likes: 24,
    comments: 8,
    sentiment: "negative",
    timestamp: "Il y a 2h",
    avatar: "JD",
  },
  {
    id: 2,
    author: "Marie Martin",
    category: "events",
    title: "Fête de quartier ce weekend !",
    content: "Rejoignez-nous samedi pour la fête annuelle du quartier. Musique, nourriture et animations pour toute la famille.",
    likes: 156,
    comments: 42,
    sentiment: "positive",
    timestamp: "Il y a 4h",
    avatar: "MM",
  },
  {
    id: 3,
    author: "Pierre Leblanc",
    category: "infrastructure",
    title: "Travaux de rénovation de la route",
    content: "Les travaux de rénovation de la route principale commenceront lundi. Prévoir des détours.",
    likes: 45,
    comments: 15,
    sentiment: "neutral",
    timestamp: "Il y a 6h",
    avatar: "PL",
  },
];

const BADGES = [
  { id: 1, name: "Citoyen Actif", icon: "⭐", count: 1 },
  { id: 2, name: "Expert Sécurité", icon: "🔒", count: 3 },
  { id: 3, name: "Animateur", icon: "🎤", count: 2 },
];

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coral-50 to-mint-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🏘️ Neighbor AI</h1>
          <p className="text-gray-600 mb-6">
            Connectez-vous avec votre communauté locale. Partagez, signalez et collaborez pour améliorer votre quartier.
          </p>
          <Button 
            onClick={() => window.location.href = getLoginUrl()}
            className="w-full bg-coral-500 hover:bg-coral-600"
          >
            Se connecter avec Manus
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">🏘️ Neighbor AI</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-sm font-semibold hover:text-coral-500">Accueil</button>
            <button onClick={() => navigate("/map")} className="text-sm font-semibold hover:text-coral-500">Carte</button>
            <button onClick={() => navigate("/dashboard")} className="text-sm font-semibold hover:text-coral-500">Dashboard</button>
            <span className="text-sm text-gray-600">{user?.name || "Utilisateur"}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
            >
              Déconnexion
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-coral-200 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Partagez une mise à jour avec votre quartier..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-coral-500"
                    rows={3}
                  />
                  <div className="mt-4 flex gap-2">
                    <select className="px-3 py-2 border rounded-lg text-sm">
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    <Button className="ml-auto bg-coral-500 hover:bg-coral-600">
                      Publier
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Posts */}
            {MOCK_POSTS.map(post => (
              <Card key={post.id} className="p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-mint-200 flex items-center justify-center font-bold">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{post.author}</span>
                      <span className={`text-xs px-2 py-1 rounded ${CATEGORIES.find(c => c.id === post.category)?.color}`}>
                        {CATEGORIES.find(c => c.id === post.category)?.label}
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">{post.timestamp}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    {/* Sentiment Indicator */}
                    <div className="mb-4 p-2 rounded bg-gray-100 text-xs">
                      <span className="font-semibold">Sentiment: </span>
                      {post.sentiment === "positive" && "😊 Positif"}
                      {post.sentiment === "negative" && "😟 Négatif"}
                      {post.sentiment === "neutral" && "😐 Neutre"}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 text-gray-600">
                      <button 
                        onClick={() => {
                          if (likedPosts.includes(post.id)) {
                            setLikedPosts(likedPosts.filter(id => id !== post.id));
                          } else {
                            setLikedPosts([...likedPosts, post.id]);
                          }
                        }}
                        className="flex items-center gap-2 hover:text-coral-500"
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts.includes(post.id) ? "fill-coral-500 text-coral-500" : ""}
                        />
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-mint-500">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-yellow-500">
                        <Share2 size={18} />
                      </button>
                      <button className="flex items-center gap-2 hover:text-red-500 ml-auto">
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
            {/* Categories Filter */}
            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Catégories</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === "all" ? "bg-coral-100 text-coral-800 font-semibold" : "hover:bg-gray-100"}`}
                >
                  Tous les posts
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded ${selectedCategory === cat.id ? "bg-coral-100 text-coral-800 font-semibold" : "hover:bg-gray-100"}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} />
                <h2 className="font-bold text-lg">Top Contributeurs</h2>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Alice Dupont", posts: 24, badge: "⭐" },
                  { name: "Bob Martin", posts: 18, badge: "🔒" },
                  { name: "Charlie Leblanc", posts: 15, badge: "🎤" },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded">
                    <span className="text-xl">{user.badge}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} />
                <h2 className="font-bold text-lg">Vos Badges</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {BADGES.map(badge => (
                  <div key={badge.id} className="text-center p-3 bg-gray-100 rounded">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <p className="text-xs font-semibold">{badge.name}</p>
                    <p className="text-xs text-gray-500">×{badge.count}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Map Preview */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} />
                <h2 className="font-bold text-lg">Carte du Quartier</h2>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-mint-100 to-blue-100 rounded flex items-center justify-center">
                <p className="text-gray-600 text-sm">Carte interactive</p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Voir la carte complète
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
