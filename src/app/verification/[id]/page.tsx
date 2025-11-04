"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Bell, ArrowLeft, CheckCircle2, Clock, AlertCircle, FileText, MessageSquare, Coins } from "lucide-react";
import Link from "next/link";

export default function VerificationStatusPage({ params }: { params: { id: string } }) {
  const project = {
    id: params.id,
    name: "Amazon Rainforest Conservation",
    status: "verified", // submitted, in-review, changes-required, verified
    submittedDate: "2024-08-01",
    lastUpdate: "2024-09-15"
  };

  const timeline = [
    { 
      step: "Project Submitted", 
      date: "2024-08-01", 
      status: "completed",
      description: "Initial project submission received"
    },
    { 
      step: "Document Review", 
      date: "2024-08-05", 
      status: "completed",
      description: "All MRV documents under review"
    },
    { 
      step: "Field Verification", 
      date: "2024-08-20", 
      status: "completed",
      description: "On-site verification completed"
    },
    { 
      step: "Technical Assessment", 
      date: "2024-09-01", 
      status: "completed",
      description: "Methodology and calculations verified"
    },
    { 
      step: "Final Approval", 
      date: "2024-09-15", 
      status: "completed",
      description: "Project approved for tokenization"
    },
    { 
      step: "Mint Credits", 
      date: "Ready", 
      status: "ready",
      description: "Eligible to mint carbon credits"
    }
  ];

  const verificationDocs = [
    { name: "Validation Report", uploaded: true, date: "2024-08-05" },
    { name: "Field Verification Photos", uploaded: true, date: "2024-08-20" },
    { name: "Technical Assessment", uploaded: true, date: "2024-09-01" },
    { name: "Verifier Attestation", uploaded: true, date: "2024-09-15" }
  ];

  const verifierNotes = [
    {
      id: 1,
      date: "2024-08-10",
      author: "Dr. Sarah Chen, Lead Verifier",
      note: "Initial documentation review completed. All required files are present and properly formatted. Proceeding to field verification phase."
    },
    {
      id: 2,
      date: "2024-08-25",
      author: "Dr. Sarah Chen, Lead Verifier",
      note: "Field verification completed successfully. The project site matches the documentation provided. Biodiversity assessments confirm positive environmental impact."
    },
    {
      id: 3,
      date: "2024-09-15",
      author: "Dr. Sarah Chen, Lead Verifier",
      note: "All verification stages completed. Project meets VCS standards and is approved for carbon credit issuance. Estimated capacity: 250,000 tCO₂e."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      case "in-review":
        return "bg-accent/20 text-accent border-accent/30";
      case "changes-required":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      case "verified":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-5 w-5" />;
      case "in-review":
        return <Clock className="h-5 w-5" />;
      case "changes-required":
        return <AlertCircle className="h-5 w-5" />;
      case "verified":
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary">CarbonChain</h1>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/marketplace" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Marketplace
                </Link>
                <Link href="/projects" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  My Projects
                </Link>
                <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
                <Link href="/transactions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Transactions
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-mono text-muted-foreground">0x742d...89Ab</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-6 animate-fade-in-up">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Projects
          </Button>
        </Link>

        {/* Header with Status */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
              <p className="text-muted-foreground">
                Submitted on {project.submittedDate} • Last updated {project.lastUpdate}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="capitalize">{project.status.replace("-", " ")}</span>
            </div>
          </div>
        </div>

        {/* Verification Timeline */}
        <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-bold mb-6">Verification Timeline</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    item.status === "completed" ? "bg-primary/20" :
                    item.status === "ready" ? "bg-accent/20" :
                    "bg-muted"
                  }`}>
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : item.status === "ready" ? (
                      <Coins className="h-5 w-5 text-accent" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className={`w-px h-16 mt-2 ${
                      item.status === "completed" ? "bg-primary/30" : "bg-border"
                    }`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{item.step}</p>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {project.status === "verified" && (
            <div className="mt-8 pt-6 border-t border-border">
              <Button size="lg" className="w-full h-14 text-base font-semibold">
                <Coins className="h-5 w-5 mr-2" />
                Mint Carbon Credits
              </Button>
            </div>
          )}
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Verification Documents */}
          <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6">Verification Documents</h3>
            <div className="space-y-3">
              {verificationDocs.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Uploaded {doc.date}</p>
                    </div>
                  </div>
                  {doc.uploaded && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Verifier Notes */}
          <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold mb-6">Verifier Notes</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {verifierNotes.map((note) => (
                <div key={note.id} className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{note.author}</p>
                      <p className="text-xs text-muted-foreground">{note.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground pl-11">{note.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
