import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ObservationCard from "@/components/ObservationCard";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Heart,
  Users,
  MapPin,
  Calendar
} from "lucide-react";

// Extended mock data
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
  },
  {
    id: "4",
    title: "Northern Lights Display in Alaska",
    description: "Spectacular aurora borealis display with vibrant greens and purples dancing across the sky. The geomagnetic activity was incredibly strong tonight.",
    image: "/placeholder.svg",
    category: "Aurora",
    location: "Fairbanks, Alaska",
    date: "2 days ago",
    user: {
      name: "James Wilson",
      avatar: "/placeholder.svg"
    },
    likes: 156,
    comments: 34,
    isLiked: false
  },
  {
    id: "5",
    title: "Jupiter and Its Moons",
    description: "Beautiful alignment of Jupiter with its four largest moons clearly visible through my 6-inch reflector telescope. Io, Europa, Ganymede, and Callisto all in view.",
    image: "/placeholder.svg",
    category: "Planet",
    location: "Texas, USA",
    date: "3 days ago",
    user: {
      name: "Lisa Park",
      avatar: "/placeholder.svg"
    },
    likes: 43,
    comments: 12,
    isLiked: true
  }
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const currentUser = {
    name: "Alex Johnson",
    email: "alex@example.com"
  };

  const categories = ["All", "Meteor", "Satellite", "Galaxy", "Nebula", "Planet", "Aurora", "Other"];

  const handleLike = (id: string) => {
    console.log("Liked observation:", id);
  };

  const handleComment = (id: string) => {
    console.log("Comment on observation:", id);
  };

  const handleShare = (id: string) => {
    console.log("Share observation:", id);
  };

  const filterOptions = [
    { value: "recent", label: "Most Recent", icon: Clock },
    { value: "popular", label: "Most Popular", icon: Heart },
    { value: "trending", label: "Trending", icon: TrendingUp },
  ];

  const filteredObservations = mockObservations.filter(obs => {
    const matchesSearch = obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         obs.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || obs.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation currentUser={currentUser} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
            Community Observations
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore incredible astronomical observations shared by our global community of stargazers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">2,341</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">486</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">67</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
          <Card className="text-center border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">324</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search and Filters */}
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
                />
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort by</label>
                  <div className="space-y-2">
                    {filterOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={selectedFilter === option.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedFilter(option.value)}
                        className="w-full justify-start space-x-2"
                      >
                        <option.icon className="h-4 w-4" />
                        <span>{option.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

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

            {/* Top Contributors */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Sarah Chen", "Mike Rodriguez", "Emma Thompson", "James Wilson"].map((name, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-cosmic flex items-center justify-center text-white text-sm font-bold">
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 10} posts</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-muted-foreground">Sarah liked your post</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">Mike started following you</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">New post from your area</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="feed">Latest Feed</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {filteredObservations.length} Observations
                  </h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>

                {filteredObservations.map((observation) => (
                  <ObservationCard
                    key={observation.id}
                    observation={observation}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))}

                <div className="text-center pt-8">
                  <Button variant="outline" size="lg">
                    Load More Observations
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Trending Observations</h3>
                  <p className="text-muted-foreground">
                    Posts with the most engagement in the last 24 hours
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Following</h3>
                  <p className="text-muted-foreground">
                    Posts from astronomers you follow
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;