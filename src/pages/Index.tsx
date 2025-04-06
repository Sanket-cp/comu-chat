
import { Button } from "@/components/ui/button";
import CommunityCard from "@/components/CommunityCard";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Demo data for featured communities
const featuredCommunities = [
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
  }
];

// Demo data for trending communities
const trendingCommunities = [
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
  }
];

const Index = () => {
  return (
    <div className="container max-w-7xl py-8">
      {/* Hero section */}
      <section className="mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-community-purple to-community-darkPurple">
            Connect with Communities that Matter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join topic-based communities, engage in real-time discussions, and build meaningful connections with like-minded people.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/discover">
              <Button size="lg" className="bg-community-purple hover:bg-community-darkPurple">
                <Users className="mr-2 h-5 w-5" />
                Explore Communities
              </Button>
            </Link>
            <Link to="/create-community">
              <Button size="lg" variant="outline">
                Create Your Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured communities section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Communities</h2>
          <Link to="/discover" className="text-community-purple hover:text-community-darkPurple flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCommunities.map((community) => (
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
      </section>

      {/* Trending communities section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-community-purple" />
            Trending Communities
          </h2>
          <Link to="/discover" className="text-community-purple hover:text-community-darkPurple flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trendingCommunities.map((community) => (
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
      </section>

      {/* How it works section */}
      <section className="mb-16 bg-community-softGray dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">How CommunitySpark Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Users className="h-8 w-8 text-community-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join Communities</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find and join communities based on your interests, hobbies, or professional needs.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-community-purple">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Engage in Discussions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Participate in real-time chat discussions with community members.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-community-purple">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Own</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start your own community and invite others who share your passion.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center bg-gradient-to-r from-community-purple to-community-darkPurple p-10 rounded-xl text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of people who have already found their communities. Start engaging today!
        </p>
        <Link to="/login">
          <Button size="lg" variant="secondary" className="bg-white text-community-purple hover:bg-gray-100">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
