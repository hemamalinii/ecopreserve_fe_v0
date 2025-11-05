"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, CheckCircle2, Clock, FileText, Coins, TrendingUp, Edit } from "lucide-react";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";

export default function MyProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Amazon Rainforest Conservation",
      location: "Amazonas, Brazil",
      type: "Reforestation",
      status: "verified",
      credits: 50000,
      minted: 50000,
      listed: 35000,
      submittedDate: "2024-08-01",
      lastUpdate: "2024-09-15"
    },
    {
      id: 2,
      name: "Wind Energy Project Texas",
      location: "Texas, USA",
      type: "Renewable Energy",
      status: "minted",
      credits: 100000,
      minted: 100000,
      listed: 100000,
      submittedDate: "2024-07-10",
      lastUpdate: "2024-09-10"
    },
    {
      id: 3,
      name: "Mangrove Restoration Kenya",
      location: "Mombasa, Kenya",
      type: "Coastal Protection",
      status: "in-review",
      credits: 30000,
      minted: 0,
      listed: 0,
      submittedDate: "2024-09-01",
      lastUpdate: "2024-09-20"
    },
    {
      id: 4,
      name: "Solar Energy Farm Rajasthan",
      location: "Rajasthan, India",
      type: "Renewable Energy",
      status: "draft",
      credits: 75000,
      minted: 0,
      listed: 0,
      submittedDate: null,
      lastUpdate: "2024-09-25"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return { color: "bg-muted/50 text-muted-foreground border-muted", icon: <Edit className="h-3 w-3" /> };
      case "in-review":
        return { color: "bg-accent/20 text-accent border-accent/30", icon: <Clock className="h-3 w-3" /> };
      case "verified":
        return { color: "bg-primary/20 text-primary border-primary/30", icon: <CheckCircle2 className="h-3 w-3" /> };
      case "minted":
        return { color: "bg-green-500/20 text-green-600 border-green-500/30", icon: <Coins className="h-3 w-3" /> };
      case "listed":
        return { color: "bg-blue-500/20 text-blue-600 border-blue-500/30", icon: <TrendingUp className="h-3 w-3" /> };
      default:
        return { color: "bg-muted/50 text-muted-foreground border-muted", icon: <Clock className="h-3 w-3" /> };
    }
  };

  const getActionButtons = (project: typeof projects[0]) => {
    switch (project.status) {
      case "draft":
        return (
          <>
            <Link href={`/projects/${project.id}/edit`}>
              <Button variant="outline" size="sm">Edit Project</Button>
            </Link>
            <Link href="/upload-mrv">
              <Button size="sm">Upload MRV</Button>
            </Link>
          </>
        );
      case "in-review":
        return (
          <>
            <Link href={`/verification/${project.id}`}>
              <Button variant="outline" size="sm">View Status</Button>
            </Link>
            <Link href="/upload-mrv">
              <Button size="sm">Add Documents</Button>
            </Link>
          </>
        );
      case "verified":
        return (
          <>
            <Link href={`/verification/${project.id}`}>
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
            <Link href="/credits/mint">
              <Button size="sm">
                <Coins className="h-4 w-4 mr-2" />
                Mint Credits
              </Button>
            </Link>
          </>
        );
      case "minted":
        return (
          <>
            <Link href="/credits/manage">
              <Button variant="outline" size="sm">Manage Credits</Button>
            </Link>
            <Link href="/credits/sell">
              <Button size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                List for Sale
              </Button>
            </Link>
          </>
        );
      case "listed":
        return (
          <>
            <Button variant="outline" size="sm">Edit Listing</Button>
            <Link href={`/marketplace/${project.id}`}>
              <Button size="sm">View in Marketplace</Button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <MainNav />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Projects</h2>
            <p className="text-muted-foreground">
              Manage and track all your carbon offset projects
            </p>
          </div>
          <Link href="/tokenize">
            <Button size="lg" className="h-12 px-6">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up">
            <p className="text-sm text-muted-foreground font-medium mb-1">Total Projects</p>
            <p className="text-3xl font-bold">{projects.length}</p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Verified Projects</p>
            <p className="text-3xl font-bold text-primary">
              {projects.filter(p => p.status === "verified" || p.status === "minted" || p.status === "listed").length}
            </p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Credits Minted</p>
            <p className="text-3xl font-bold text-accent">
              {projects.reduce((sum, p) => sum + p.minted, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <p className="text-sm text-muted-foreground font-medium mb-1">Listed for Sale</p>
            <p className="text-3xl font-bold text-secondary-foreground">
              {projects.reduce((sum, p) => sum + p.listed, 0).toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            return (
              <Card 
                key={project.id} 
                className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 hover:shadow-xl transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                          <span>•</span>
                          <span className="font-semibold px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
                            {project.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          {project.submittedDate && (
                            <span className="text-muted-foreground">
                              Submitted: {project.submittedDate}
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            Updated: {project.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-semibold text-sm ${statusBadge.color}`}>
                    {statusBadge.icon}
                    <span className="capitalize">{project.status.replace("-", " ")}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Credits</p>
                    <p className="text-lg font-bold">{project.credits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Minted</p>
                    <p className="text-lg font-bold text-accent">{project.minted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Listed</p>
                    <p className="text-lg font-bold text-primary">{project.listed.toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {getActionButtons(project)}
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
