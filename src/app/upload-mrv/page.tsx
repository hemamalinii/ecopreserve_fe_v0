"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Bell, ArrowLeft, Upload, FileText, X, CheckCircle2, Hash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UploadMRVPage() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Project_Design_Document.pdf",
      size: "2.4 MB",
      hash: "Qm...abc123",
      uploadDate: "2024-09-15"
    },
    {
      id: 2,
      name: "Monitoring_Report_2024.pdf",
      size: "1.8 MB",
      hash: "Qm...def456",
      uploadDate: "2024-09-20"
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic
  };

  const handleRemoveFile = (id: number) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary">ClimateCreds</h1>
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
        <Link href="/tokenize">
          <Button variant="ghost" className="mb-6 animate-fade-in-up">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project Form
          </Button>
        </Link>

        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-2">Upload MRV Documents</h2>
          <p className="text-muted-foreground">
            Upload monitoring, reporting, and verification documents for your carbon project
          </p>
        </div>

        {/* Upload Area */}
        <Card 
          className={`p-12 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up transition-all ${
            isDragging ? "border-primary bg-primary/5" : "border-dashed"
          }`}
          style={{ animationDelay: '0.1s' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drag and drop files here</h3>
            <p className="text-muted-foreground mb-6">
              or click to browse from your computer
            </p>
            <Button size="lg" className="h-12 px-8">
              <Upload className="h-5 w-5 mr-2" />
              Browse Files
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB per file)
            </p>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 my-8">
          <Card className="p-6 border-2 bg-primary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-2">IPFS Storage</p>
                <p className="text-sm text-muted-foreground">
                  All documents are securely pinned to IPFS for permanent, decentralized storage.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-2 bg-accent/5 border-accent/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex gap-3">
              <Hash className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-2">Content Verification</p>
                <p className="text-sm text-muted-foreground">
                  Each file receives a unique hash to ensure authenticity and prevent tampering.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <Card className="p-6 shadow-lg border-2 backdrop-blur-sm bg-card/95 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-4">Uploaded Documents</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{file.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>Uploaded {file.uploadDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Hash className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">{file.hash}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            size="lg" 
            className="flex-1 h-14 text-base font-semibold"
            disabled={uploadedFiles.length === 0}
          >
            Submit to Verifiers
          </Button>
          <Link href="/tokenize" className="flex-1">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-14 text-base font-semibold"
            >
              Continue Later
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
