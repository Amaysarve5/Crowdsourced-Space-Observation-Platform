import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ObservationCard from "@/components/ObservationCard";
import { 
  User, 
  Settings, 
  Camera, 
  Star, 
  MapPin, 
  Calendar,
  Edit,
  Trash2,
  Eye,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    location: "Colorado, USA",
    bio: "Amateur astronomer and astrophotographer passionate about deep space objects and meteor hunting.",
    joinDate: "January 2023",
  });
  const { toast } = useToast();

  const currentUser = {
    name: profileData.name,
    email: profileData.email
  };

  // Mock user's observations
  const userObservations = [
    {
      id: "1",
      title: "Orion Nebula Through My 8-inch Telescope",
      description: "Captured this stunning view of M42 during last night's clear skies. 30-minute exposure with my DSLR.",
      image: "/placeholder.svg",
      category: "Nebula",
      location: "Colorado, USA",
      date: "3 days ago",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg"
      },
      likes: 45,
      comments: 12,
      isLiked: false
    },
    {
      id: "2",
      title: "Saturn's Rings in Detail",
      description: "Amazing detail visible in Saturn's ring system tonight. The Cassini division is clearly visible.",
      image: "/placeholder.svg",
      category: "Planet",
      location: "Colorado, USA",
      date: "1 week ago",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg"
      },
      likes: 78,
      comments: 23,
      isLiked: false
    }
  ];

  const stats = [
    { label: "Observations", value: "24", icon: Camera },
    { label: "Total Likes", value: "456", icon: Heart },
    { label: "Total Views", value: "2.1k", icon: Eye },
    { label: "Rank", value: "#87", icon: Star },
  ];

  const achievements = [
    { name: "First Observer", description: "Shared your first observation", date: "Jan 2023" },
    { name: "Popular Post", description: "Received 100+ likes on a post", date: "Mar 2023" },
    { name: "Active Member", description: "Posted 10+ observations", date: "Jun 2023" },
    { name: "Community Star", description: "Helped 5+ fellow astronomers", date: "Aug 2023" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleLike = (id: string) => {
    console.log("Liked observation:", id);
  };

  const handleComment = (id: string) => {
    console.log("Comment on observation:", id);
  };

  const handleShare = (id: string) => {
    console.log("Share observation:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit observation:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete observation:", id);
    toast({
      title: "Observation deleted",
      description: "Your observation has been removed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation currentUser={currentUser} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="mb-8 border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-cosmic text-white text-2xl">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-2">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {profileData.joinDate}</span>
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-card/50 rounded-lg border border-border/50">
                      <stat.icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        {isEditing && (
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Edit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-gradient-cosmic hover:opacity-90">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Content Tabs */}
        <Tabs defaultValue="observations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="observations">My Observations</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="observations" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {userObservations.length} Observations
              </h2>
              <Link to="/upload">
                <Button className="bg-gradient-cosmic hover:opacity-90">
                  <Camera className="h-4 w-4 mr-2" />
                  Add New Observation
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {userObservations.map((observation) => (
                <div key={observation.id} className="relative group">
                  <ObservationCard
                    observation={observation}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                  {/* Owner actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(observation.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(observation.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-cosmic rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          Earned {achievement.date}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm">Received 5 likes on "Saturn's Rings in Detail"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                    <Camera className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm">Posted new observation "Orion Nebula Through My 8-inch Telescope"</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                    <User className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm">Started following Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;