
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search } from "lucide-react";
import CommunityCard from "@/components/CommunityCard";
import { useSearchParams } from "react-router-dom";

// Demo data for communities
const communitiesData = [
  {
    id: 1,
    name: "Music Lovers",
    icon: "🎵",
    description: "A community for sharing and discussing all genres of music. From classical to rock, jazz to hip-hop, we cover it all!",
    memberCount: 2478,
    tags: ["Music", "Entertainment", "Arts"]
  },
  {
    id: 2,
    name: "Foodies United",
    icon: "🍔",
    description: "For those passionate about cooking, eating, and exploring new cuisines. Share recipes, restaurant recommendations, and food photos!",
    memberCount: 1853,
    tags: ["Food", "Cooking", "Restaurants"]
  },
  {
    id: 3,
    name: "Tech Talk",
    icon: "💻",
    description: "Stay updated with the latest in technology. Discuss gadgets, programming, AI, and tech industry news.",
    memberCount: 3542,
    tags: ["Technology", "Programming", "AI"]
  },
  {
    id: 4,
    name: "Book Club",
    icon: "📚",
    description: "A place for book enthusiasts to discuss literary works, share recommendations, and participate in reading challenges.",
    memberCount: 1265,
    tags: ["Books", "Reading", "Literature"]
  },
  {
    id: 5,
    name: "Fitness Group",
    icon: "🏋️",
    description: "Join others on their fitness journey. Share workout routines, nutrition tips, and motivate each other to reach fitness goals.",
    memberCount: 2105,
    tags: ["Fitness", "Health", "Workout"]
  },
  {
    id: 6,
    name: "Travel Enthusiasts",
    icon: "✈️",
    description: "For those who love exploring new places. Share travel stories, tips, photos, and plan group adventures.",
    memberCount: 1932,
    tags: ["Travel", "Adventure", "Photography"]
  },
  {
    id: 7,
    name: "Art & Design",
    icon: "🎨",
    description: "A creative space for artists and designers to showcase their work, get feedback, and discuss techniques and trends.",
    memberCount: 1657,
    tags: ["Art", "Design", "Creative"]
  },
  {
    id: 8,
    name: "Gaming Hub",
    icon: "🎮",
    description: "Connect with fellow gamers, discuss new releases, share gameplay experiences, and organize multiplayer sessions.",
    memberCount: 3021,
    tags: ["Gaming", "Esports", "Entertainment"]
  },
  {
    id: 9,
    name: "Photography Club",
    icon: "📷",
    description: "A community for photography enthusiasts to share their work, learn techniques, and discuss equipment.",
    memberCount: 1845,
    tags: ["Photography", "Art", "Creative"]
  },
  {
    id: 10,
    name: "Science Explorers",
    icon: "🔬",
    description: "Discuss the latest scientific discoveries, research papers, and engage in thought-provoking conversations about various scientific fields.",
    memberCount: 1576,
    tags: ["Science", "Research", "Education"]
  },
  {
    id: 11,
    name: "Movie Buffs",
    icon: "🎬",
    description: "For cinema enthusiasts to discuss movies, share reviews, and talk about film theory and production.",
    memberCount: 2134,
    tags: ["Movies", "Entertainment", "Film"]
  },
  {
    id: 12,
    name: "Pet Lovers",
    icon: "🐾",
    description: "Share cute pet photos, ask for advice, and connect with other pet owners.",
    memberCount: 2756,
    tags: ["Pets", "Animals", "Dogs", "Cats"]
  }
];

const categories = [
  "All Categories",
  "Arts & Culture",
  "Entertainment",
  "Technology",
  "Health & Fitness",
  "Food & Cooking",
  "Travel",
  "Education",
  "Sports",
  "Gaming",
  "Lifestyle",
  "Business"
];

const DiscoverPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("popularity");
  
  // Update search query when URL parameter changes
  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(params => {
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      return params;
    });
  };
  
  // Filter communities based on search query and category
  const filteredCommunities = communitiesData.filter(community => {
    const matchesQuery = community.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === "All Categories") {
      return matchesQuery;
    } else {
      return matchesQuery && community.tags.some(tag => 
        selectedCategory.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
  });
  
  // Sort communities based on selected option
  const sortedCommunities = [...filteredCommunities].sort((a, b) => {
    if (sortOption === "popularity") {
      return b.memberCount - a.memberCount;
    } else if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "newest") {
      // For demo purposes, we'll use the id as a proxy for "newest"
      return b.id - a.id;
    }
    return 0;
  });
  
  return (
    <div className="container max-w-7xl py-8">
      <h1 className="text-3xl font-bold mb-6">Discover Communities</h1>
      
      {/* Search and filter section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 mb-8">
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {sortedCommunities.length} of {communitiesData.length} communities
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </p>
      </div>
      
      {/* Communities grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedCommunities.map((community) => (
          <CommunityCard
            key={community.id}
            id={community.id}
            name={community.name}
            icon={community.icon}
            description={community.description}
            memberCount={community.memberCount}
            tags={community.tags}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {sortedCommunities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No communities found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
