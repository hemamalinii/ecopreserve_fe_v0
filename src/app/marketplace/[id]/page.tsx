"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, CheckCircle2, FileText, Calendar, Award, ShoppingCart, MessageSquare, ArrowLeft, ExternalLink, Leaf } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BuyCreditsModal } from "@/components/buy-credits-modal";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBuyModal, setShowBuyModal] = useState(false);

  const project = {
    id: parseInt(params.id),
    title: "Amazon Rainforest Conservation",
    location: "Amazonas, Brazil",
    price: 12.50,
    vintage: "2024",
    verified: true,
    type: "Reforestation",
    credits: 50000,
    methodology: "VCS (Verified Carbon Standard)",
    verificationBody: "Verra",
    capacity: "250,000 tCO₂e",
    tokenIdRange: "#1000-#51000",
    description: "This large-scale reforestation project focuses on restoring degraded rainforest areas in the Amazon basin. The project works with local communities to plant native tree species, protect existing forest from deforestation, and establish sustainable livelihoods through agroforestry practices.",
    impactMetrics: [
      { label: "Total Area", value: "15,000 hectares" },
      { label: "Trees Planted", value: "2.5 Million" },
      { label: "CO₂ Sequestered", value: "250,000 tCO₂e" },
      { label: "Communities Supported", value: "12 Villages" }
    ],
    verificationDocs: [
      { name: "Project Design Document", size: "2.4 MB", date: "2024-01-15" },
      { name: "Validation Report", size: "1.8 MB", date: "2024-02-20" },
      { name: "Monitoring Report 2024", size: "3.2 MB", date: "2024-06-10" },
      { name: "Third-Party Audit", size: "1.5 MB", date: "2024-08-05" }
    ],
    timeline: [
      { date: "2023-06-01", event: "Project Initiation", status: "completed" },
      { date: "2023-09-15", event: "Site Assessment", status: "completed" },
      { date: "2024-01-10", event: "Validation Completed", status: "completed" },
      { date: "2024-08-20", event: "Verification Approved", status: "completed" },
      { date: "2024-09-01", event: "Credits Issued", status: "completed" }
    ]
  };

  const handlePurchase = (projectId: number, quantity: number, paymentMethod: "crypto" | "fiat") => {
    console.log("Purchase:", { projectId, quantity, paymentMethod });
    // Handle purchase logic
    alert(`Successfully purchased ${quantity} credits!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Back Button */}
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6 animate-fade-in-up">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Banner */}
            <Card className="overflow-hidden shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up">
              <div className="relative h-80 bg-gradient-to-br from-primary/30 to-accent/30">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-6 right-6">
                  {project.verified && (
                    <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified Project
                    </div>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/90 mb-3">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-card-foreground">
                      {project.type}
                    </span>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-card-foreground">
                      Vintage {project.vintage}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-border animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-gold"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("documentation")}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === "documentation"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-gold"
                }`}
              >
                Documentation
              </button>
              <button
                onClick={() => setActiveTab("verification")}
                className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === "verification"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-gold"
                }`}
              >
                Verification Timeline
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <h3 className="text-xl font-bold mb-4">Impact Metrics</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.impactMetrics.map((metric, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Methodology</span>
                    <span className="font-semibold">{project.methodology}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Verification Body</span>
                    <span className="font-semibold">{project.verificationBody}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">CO₂ Offset Capacity</span>
                    <span className="font-semibold">{project.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Token ID Range</span>
                    <span className="font-semibold poiret-one-regular">{project.tokenIdRange}</span>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "documentation" && (
              <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">MRV Documents & Evidence</h2>
                <div className="space-y-4">
                  {project.verificationDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.size} • Uploaded {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "verification" && (
              <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Verification Timeline</h2>
                <div className="space-y-6">
                  {project.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          item.status === "completed" ? "bg-primary/20" : "bg-muted"
                        }`}>
                          {item.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                          )}
                        </div>
                        {index < project.timeline.length - 1 && (
                          <div className="w-px h-16 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="font-semibold">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up sticky top-24" style={{ animationDelay: '0.2s' }}>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Price per Credit</p>
                <p className="text-4xl font-bold text-primary mb-1">${project.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">USD per tCO₂e</p>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Available Credits</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Leaf className="h-4 w-4 text-primary" />
                    {project.credits.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Verification Status</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base font-semibold" 
                  size="lg"
                  onClick={() => setShowBuyModal(true)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy Credits
                </Button>
                <Button variant="outline" className="w-full h-12 text-base font-semibold" size="lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Developer
                </Button>
              </div>
            </Card>

            {/* Verification Badge */}
            <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Verified by</p>
                  <p className="text-sm text-muted-foreground">{project.verificationBody}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This project has been independently verified and meets all international carbon offset standards.
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Buy Credits Modal */}
      <BuyCreditsModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        project={project}
        onPurchase={handlePurchase}
      />
    </div>
  );
}