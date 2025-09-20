import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import ObservationCard from "@/components/ObservationCard";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Eye,
  TrendingUp
} from "lucide-react";
import spaceHero from "@/assets/space-hero.jpg";

// Mock data for demonstration
const mockObservations = [
  {
    id: "1",
    title: "Incredible Meteor Shower Over Colorado",
    description: "Witnessed an amazing Perseid meteor shower last night with over 60 meteors per hour. The sky was crystal clear and the show was absolutely spectacular! Best viewing was around 2-4 AM local time.",
    image: "/placeholder.svg",
    category: "Meteor",
    location: "Colorado, USA",
    date: "2 hours ago",
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg"
    },
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: "2", 
    title: "ISS Transit Across the Moon",
    description: "Captured this incredible shot of the International Space Station transiting across the lunar surface. Perfect timing and weather conditions made this shot possible.",
    image: "/placeholder.svg",
    category: "Satellite",
    location: "Arizona, USA", 
    date: "5 hours ago",
    user: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg"
    },
    likes: 67,
    comments: 15,
    isLiked: true
  },
  {
    id: "3",
    title: "Stunning Andromeda Galaxy Capture",
    description: "3-hour exposure of the Andromeda Galaxy using my 8-inch telescope. You can clearly see the spiral arms and dust lanes in this shot.",
    image: "/placeholder.svg", 
    category: "Galaxy",
    location: "Oregon, USA",
    date: "1 day ago",
    user: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg"
    },
    likes: 89,
    comments: 23,
    isLiked: false
  }
];

const mockStats = [
  { label: "Total Observations", value: "2,341", icon: Eye, trend: "+12%" },
  { label: "Active Observers", value: "486", icon: Users, trend: "+8%" },
  { label: "Countries", value: "67", icon: Star, trend: "+3%" },
  { label: "This Month", value: "324", icon: TrendingUp, trend: "+24%" }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const currentUser = {
    name: "Alex Johnson",
    email: "alex@example.com"
  };

  const categories = ["All", "Meteor", "Satellite", "Galaxy", "Nebula", "Planet", "Other"];

  const handleLike = (id: string) => {
    console.log("Liked observation:", id);
  };

  const handleComment = (id: string) => {
    console.log("Comment on observation:", id);
  };

  const handleShare = (id: string) => {
    console.log("Share observation:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation currentUser={currentUser} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-nebula" />
        <img 
          src={spaceHero} 
          alt="Space background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
            Explore the Cosmos
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join a global community of amateur astronomers sharing incredible observations, 
            discoveries, and the wonders of our universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-gradient-cosmic hover:opacity-90 transition-opacity">
                Share Your Observation
              </Button>
            </Link>
            <Link to="/community">
              <Button size="lg" variant="outline" className="border-primary/50">
                Explore Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockStats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Search & Filter</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Search observations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Featured Observers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Sarah Chen", "Mike Rodriguez", "Emma Thompson"].map((name, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center text-white text-sm font-bold">
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 10} observations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest Observations</h2>
                <Link to="/community">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-6">
                {mockObservations.map((observation) => (
                  <ObservationCard
                    key={observation.id}
                    observation={observation}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/community">
                  <Button variant="outline" size="lg">
                    Load More Observations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
