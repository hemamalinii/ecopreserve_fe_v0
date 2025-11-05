'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainNav } from '@/components/main-nav';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    description: '',
    credits: '',
    startDate: '',
    endDate: '',
  });

  // Load project data (in real app, fetch from API)
  useEffect(() => {
    // Simulate loading project data
    setFormData({
      name: 'Amazon Rainforest Conservation',
      location: 'Amazonas, Brazil',
      type: 'Reforestation',
      description: 'Large-scale reforestation project in the Amazon rainforest',
      credits: '50000',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
    });
  }, [params.id]);

  // Track changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Prevent navigation if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation('/projects');
      setShowConfirmDialog(true);
    } else {
      router.push('/projects');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success',
        description: 'Project saved successfully',
        variant: 'default',
      });
      
      setHasUnsavedChanges(false);
      router.push('/projects');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const confirmLeave = () => {
    setShowConfirmDialog(false);
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
  };

  const cancelLeave = () => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <MainNav />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header with Back Button */}
        <div className="mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Projects
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
              <p className="text-muted-foreground">
                Update your project details
              </p>
            </div>
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                <AlertTriangle className="h-4 w-4" />
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Update the details of your conservation project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Project Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select type</option>
                  <option value="Reforestation">Reforestation</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Coastal Protection">Coastal Protection</option>
                  <option value="Soil Conservation">Soil Conservation</option>
                  <option value="Wildlife Protection">Wildlife Protection</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your project"
                className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-background resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credits">Expected Credits *</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => handleInputChange('credits', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle>Unsaved Changes</CardTitle>
                  <CardDescription>
                    You have unsaved changes that will be lost
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to leave this page? All unsaved changes will be lost.
              </p>
              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" onClick={cancelLeave}>
                  Stay on Page
                </Button>
                <Button variant="destructive" onClick={confirmLeave}>
                  Leave Without Saving
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
