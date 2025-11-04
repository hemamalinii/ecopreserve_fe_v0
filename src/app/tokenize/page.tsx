"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Bell, ArrowLeft, Save, Send, Upload, MapPin, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TokenizePage() {
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    description: "",
    methodology: "",
    vintage: "",
    capacity: "",
    projectType: ""
  });

  const [isDraft, setIsDraft] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    // Save draft logic
    console.log("Draft saved:", formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
    console.log("Form submitted:", formData);
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
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6 animate-fade-in-up">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-2">Tokenize New Project</h2>
          <p className="text-muted-foreground">
            Submit your carbon offset project for verification and tokenization
          </p>
        </div>

        {isDraft && (
          <Card className="p-4 mb-6 border-2 border-accent/50 bg-accent/5 animate-fade-in">
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-accent">Draft saved successfully</p>
            </div>
          </Card>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="p-8 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label htmlFor="projectName" className="block text-sm font-semibold mb-2">
                  Project Name <span className="text-primary">*</span>
                </label>
                <Input
                  id="projectName"
                  name="projectName"
                  type="text"
                  required
                  placeholder="Enter your project name"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="h-12 border-2"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold mb-2">
                  Location <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="City, State/Province, Country"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="h-12 pl-12 border-2"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold mb-2">
                  Project Type <span className="text-primary">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-lg border-2 border-input bg-background"
                >
                  <option value="">Select project type</option>
                  <option value="reforestation">Reforestation</option>
                  <option value="renewable-energy">Renewable Energy</option>
                  <option value="ocean-conservation">Ocean Conservation</option>
                  <option value="coastal-protection">Coastal Protection</option>
                  <option value="biomass">Biomass Energy</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2">
                  Project Description <span className="text-primary">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  placeholder="Describe your project, its goals, and expected environmental impact..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background resize-none"
                />
              </div>

              {/* Grid: Methodology & Vintage */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="methodology" className="block text-sm font-semibold mb-2">
                    Methodology <span className="text-primary">*</span>
                  </label>
                  <select
                    id="methodology"
                    name="methodology"
                    required
                    value={formData.methodology}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg border-2 border-input bg-background"
                  >
                    <option value="">Select methodology</option>
                    <option value="vcs">VCS (Verified Carbon Standard)</option>
                    <option value="gold-standard">Gold Standard</option>
                    <option value="verra">Verra</option>
                    <option value="cdm">CDM (Clean Development Mechanism)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vintage" className="block text-sm font-semibold mb-2">
                    Expected Vintage Year <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="vintage"
                    name="vintage"
                    type="text"
                    required
                    placeholder="e.g., 2024"
                    value={formData.vintage}
                    onChange={handleInputChange}
                    className="h-12 border-2"
                  />
                </div>
              </div>

              {/* CO2 Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-semibold mb-2">
                  Expected CO₂ Offset Capacity <span className="text-primary">*</span>
                </label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="text"
                  required
                  placeholder="e.g., 100,000 tCO₂e"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="h-12 border-2"
                />
              </div>

              {/* MRV Documents Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  MRV Documents <span className="text-primary">*</span>
                </label>
                <Link href="/upload-mrv">
                  <Card className="p-6 border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <p className="font-semibold mb-1">Upload MRV Documents</p>
                      <p className="text-sm text-muted-foreground">
                        Click to upload project documentation, monitoring reports, and verification evidence
                      </p>
                    </div>
                  </Card>
                </Link>
              </div>

              {/* Info Box */}
              <Card className="p-4 border-2 border-accent/30 bg-accent/5">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-accent mb-1">Required Documentation</p>
                    <p className="text-sm text-muted-foreground">
                      Your project will be reviewed by certified verifiers before minting is enabled. Ensure all MRV documents are complete and accurate.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              type="submit"
              size="lg"
              className="flex-1 h-14 text-base font-semibold"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit for Verification
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 h-14 text-base font-semibold"
              onClick={handleSaveDraft}
            >
              <Save className="h-5 w-5 mr-2" />
              Save as Draft
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
