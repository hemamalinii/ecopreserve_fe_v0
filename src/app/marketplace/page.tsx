"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Bell, Search, SlidersHorizontal, MapPin, Leaf, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Conservation",
      location: "Brazil",
      image: "/api/placeholder/400/300",
      price: 12.50,
      vintage: "2024",
      verified: true,
      type: "Reforestation",
      credits: 50000,
      methodology: "VCS"
    },
    {
      id: 2,
      title: "Solar Energy Farm India",
      location: "Rajasthan, India",
      image: "/api/placeholder/400/300",
      price: 8.75,
      vintage: "2023",
      verified: true,
      type: "Renewable Energy",
      credits: 75000,
      methodology: "Gold Standard"
    },
    {
      id: 3,
      title: "Ocean Plastic Recovery",
      location: "Pacific Ocean",
      image: "/api/placeholder/400/300",
      price: 15.00,
      vintage: "2024",
      verified: true,
      type: "Ocean Conservation",
      credits: 25000,
      methodology: "Verra"
    },
    {
      id: 4,
      title: "Wind Energy Project Texas",
      location: "Texas, USA",
      image: "/api/placeholder/400/300",
      price: 10.25,
      vintage: "2023",
      verified: true,
      type: "Renewable Energy",
      credits: 100000,
      methodology: "VCS"
    },
    {
      id: 5,
      title: "Mangrove Restoration Kenya",
      location: "Mombasa, Kenya",
      image: "/api/placeholder/400/300",
      price: 11.50,
      vintage: "2024",
      verified: true,
      type: "Coastal Protection",
      credits: 30000,
      methodology: "Gold Standard"
    },
    {
      id: 6,
      title: "Biomass Energy Plant",
      location: "Indonesia",
      image: "/api/placeholder/400/300",
      price: 9.00,
      vintage: "2023",
      verified: true,
      type: "Renewable Energy",
      credits: 60000,
      methodology: "Verra"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-2">Carbon Credit Marketplace</h2>
          <p className="text-muted-foreground">
            Discover verified carbon offset projects from around the world
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by name, location, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-2"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 px-6"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-6 mb-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Project Type</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Types</option>
                  <option>Reforestation</option>
                  <option>Renewable Energy</option>
                  <option>Ocean Conservation</option>
                  <option>Coastal Protection</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Price Range</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Prices</option>
                  <option>$0 - $10</option>
                  <option>$10 - $20</option>
                  <option>$20+</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Vintage Year</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Years</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Verification</label>
                <select className="w-full h-10 px-3 rounded-lg border-2 border-input bg-background">
                  <option>All Status</option>
                  <option>Verified Only</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/marketplace/${project.id}`}>
              <Card className="overflow-hidden shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer animate-fade-in-up group" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 right-4 z-10">
                    {project.verified && (
                      <div className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{project.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
                      {project.type}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent">
                      {project.methodology}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Price per Credit</p>
                      <p className="text-xl font-bold text-primary">${project.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Available</p>
                      <p className="text-sm font-semibold flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-primary" />
                        {project.credits.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12 animate-fade-in">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-gold/90">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </main>
    </div>
  );
}
