import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const MARKERS = [
  { id: 1, lat: 48.8566, lng: 2.3522, title: "Nid de poule rue de la Paix", category: "safety", severity: "high" },
  { id: 2, lat: 48.8576, lng: 2.2954, title: "Fête de quartier", category: "events", severity: "low" },
  { id: 3, lat: 48.8646, lng: 2.3430, title: "Travaux de rénovation", category: "infrastructure", severity: "medium" },
  { id: 4, lat: 48.8704, lng: 2.3888, title: "Projet communautaire", category: "community", severity: "low" },
];

const CATEGORIES = [
  { id: "all", label: "Tous", color: "bg-gray-200" },
  { id: "safety", label: "🚨 Sécurité", color: "bg-red-200" },
  { id: "infrastructure", label: "🏗️ Infrastructure", color: "bg-blue-200" },
  { id: "events", label: "🎉 Événements", color: "bg-purple-200" },
  { id: "community", label: "👥 Communauté", color: "bg-green-200" },
];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const filteredMarkers = selectedCategory === "all" 
    ? MARKERS 
    : MARKERS.filter(m => m.category === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin size={24} />
            <h1 className="text-2xl font-bold">Carte du Quartier</h1>
          </div>
          <Button variant="outline">Paramètres</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Filter */}
            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Filtres</h2>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat.id
                        ? "bg-coral-100 text-coral-800 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Légende</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-sm">Critique</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-sm">Moyen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span className="text-sm">Faible</span>
                </div>
              </div>
            </Card>

            {/* Markers List */}
            <Card className="p-6">
              <h2 className="font-bold text-lg mb-4">Marqueurs ({filteredMarkers.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMarkers.map(marker => (
                  <button
                    key={marker.id}
                    onClick={() => setSelectedMarker(marker.id)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedMarker === marker.id
                        ? "bg-coral-100 border-2 border-coral-500"
                        : "hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getSeverityColor(marker.severity)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{marker.title}</p>
                        <p className="text-xs text-gray-500">ID: {marker.id}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="p-6 h-full">
              <div className="relative w-full h-96 bg-gradient-to-br from-mint-50 to-blue-50 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                {/* Map Grid Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                  }} />
                </div>

                {/* Markers */}
                {filteredMarkers.map(marker => (
                  <button
                    key={marker.id}
                    onClick={() => setSelectedMarker(marker.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition ${
                      selectedMarker === marker.id ? "scale-125" : "hover:scale-110"
                    }`}
                    style={{
                      left: `${((marker.lng - 2.2954) / (2.3888 - 2.2954)) * 100}%`,
                      top: `${((48.8704 - marker.lat) / (48.8704 - 48.8566)) * 100}%`,
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full ${getSeverityColor(marker.severity)} shadow-lg flex items-center justify-center text-white font-bold text-sm border-2 border-white`}>
                      {marker.id}
                    </div>
                  </button>
                ))}

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
              </div>

              {/* Selected Marker Details */}
              {selectedMarker && (
                <Card className="mt-6 p-6 bg-coral-50">
                  {(() => {
                    const marker = MARKERS.find(m => m.id === selectedMarker);
                    return marker ? (
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{marker.title}</h3>
                            <p className="text-sm text-gray-600">Lat: {marker.lat}, Lng: {marker.lng}</p>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded font-semibold ${
                            marker.severity === "high" ? "bg-red-100 text-red-800" :
                            marker.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {marker.severity === "high" ? "Critique" : marker.severity === "medium" ? "Moyen" : "Faible"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-coral-500 hover:bg-coral-600">
                            Voir Détails
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Ajouter Commentaire
                          </Button>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </Card>
              )}

              {/* Map Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-coral-500">{filteredMarkers.length}</p>
                  <p className="text-xs text-gray-600">Marqueurs</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-500">{filteredMarkers.filter(m => m.severity === "high").length}</p>
                  <p className="text-xs text-gray-600">Critiques</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-mint-500">{filteredMarkers.filter(m => m.severity === "low").length}</p>
                  <p className="text-xs text-gray-600">Faibles</p>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
