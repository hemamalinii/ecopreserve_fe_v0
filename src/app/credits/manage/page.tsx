'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, Trash2, Eye, Coins, Filter, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

interface Credit {
  id: string;
  tokenId: string;
  type: string;
  quantity: number;
  unit: string;
  projectId: string;
  projectName: string;
  mintedDate: string;
  status: 'active' | 'listed' | 'transferred' | 'retired';
}

export default function ManageCreditsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  const [showActionModal, setShowActionModal] = useState<'transfer' | 'retire' | 'view' | null>(null);
  const [transferAddress, setTransferAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [credits] = useState<Credit[]>([
    {
      id: '1',
      tokenId: 'TKN-001-2024',
      type: 'Carbon Credits',
      quantity: 1000,
      unit: 'tCO2e',
      projectId: 'PROJ-2024-001',
      projectName: 'Amazon Rainforest Conservation',
      mintedDate: '2024-09-15',
      status: 'active',
    },
    {
      id: '2',
      tokenId: 'TKN-002-2024',
      type: 'Renewable Energy',
      quantity: 500,
      unit: 'MWh',
      projectId: 'PROJ-2024-002',
      projectName: 'Wind Energy Project Texas',
      mintedDate: '2024-09-10',
      status: 'listed',
    },
    {
      id: '3',
      tokenId: 'TKN-003-2024',
      type: 'Water Credits',
      quantity: 750,
      unit: 'm³',
      projectId: 'PROJ-2024-003',
      projectName: 'Water Conservation Initiative',
      mintedDate: '2024-09-05',
      status: 'active',
    },
    {
      id: '4',
      tokenId: 'TKN-004-2024',
      type: 'Biodiversity Credits',
      quantity: 250,
      unit: 'hectares',
      projectId: 'PROJ-2024-004',
      projectName: 'Mangrove Restoration Kenya',
      mintedDate: '2024-08-28',
      status: 'retired',
    },
  ]);

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         credit.tokenId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || credit.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'listed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'transferred':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'retired':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleTransfer = async () => {
    if (!transferAddress || !selectedCredit) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Transfer Initiated',
        description: `Successfully transferred ${selectedCredit.quantity} ${selectedCredit.unit} to ${transferAddress.slice(0, 10)}...`,
        variant: 'default',
      });
      
      setShowActionModal(null);
      setTransferAddress('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to transfer credits',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetire = async () => {
    if (!selectedCredit) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Credits Retired',
        description: `Successfully retired ${selectedCredit.quantity} ${selectedCredit.unit}`,
        variant: 'default',
      });
      
      setShowActionModal(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to retire credits',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <Button
            variant="ghost"
            onClick={() => router.push('/projects')}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Manage Credits</h1>
              </div>
              <p className="text-muted-foreground">
                View and manage all your minted environmental credits
              </p>
            </div>
            <Button onClick={() => router.push('/credits/mint')}>
              <Coins className="h-4 w-4 mr-2" />
              Mint New Credits
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6 shadow-lg">
            <p className="text-sm text-muted-foreground font-medium mb-1">Total Credits</p>
            <p className="text-3xl font-bold">{credits.length}</p>
          </Card>
          <Card className="p-6 shadow-lg">
            <p className="text-sm text-muted-foreground font-medium mb-1">Active</p>
            <p className="text-3xl font-bold text-green-600">
              {credits.filter(c => c.status === 'active').length}
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <p className="text-sm text-muted-foreground font-medium mb-1">Listed</p>
            <p className="text-3xl font-bold text-blue-600">
              {credits.filter(c => c.status === 'listed').length}
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <p className="text-sm text-muted-foreground font-medium mb-1">Retired</p>
            <p className="text-3xl font-bold text-muted-foreground">
              {credits.filter(c => c.status === 'retired').length}
            </p>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by project name or token ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="listed">Listed</option>
                  <option value="transferred">Transferred</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credits List */}
        <div className="space-y-4">
          {filteredCredits.map((credit) => (
            <Card key={credit.id} className="shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{credit.projectName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(credit.status)}`}>
                        {credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Token ID</p>
                        <p className="font-mono font-semibold">{credit.tokenId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Type</p>
                        <p className="font-semibold">{credit.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Quantity</p>
                        <p className="font-semibold text-primary">
                          {credit.quantity.toLocaleString()} {credit.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Minted Date</p>
                        <p className="font-semibold">{credit.mintedDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCredit(credit);
                        setShowActionModal('view');
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {credit.status === 'active' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCredit(credit);
                            setShowActionModal('transfer');
                          }}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Transfer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCredit(credit);
                            setShowActionModal('retire');
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Retire
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCredits.length === 0 && (
            <Card className="p-12 text-center">
              <Coins className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Credits Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t minted any credits yet'}
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <Button onClick={() => router.push('/credits/mint')}>
                  Mint Your First Credits
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>

      {/* Transfer Modal */}
      {showActionModal === 'transfer' && selectedCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader>
              <CardTitle>Transfer Credits</CardTitle>
              <CardDescription>
                Transfer {selectedCredit.quantity} {selectedCredit.unit} to another address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2">Credit Details:</p>
                  <p className="text-sm text-muted-foreground">
                    Token: {selectedCredit.tokenId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {selectedCredit.quantity} {selectedCredit.unit}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Recipient Address *
                  </label>
                  <Input
                    placeholder="0x..."
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the wallet address of the recipient
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowActionModal(null);
                    setTransferAddress('');
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTransfer}
                  disabled={!transferAddress || isLoading}
                >
                  {isLoading ? 'Transferring...' : 'Transfer'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Retire Modal */}
      {showActionModal === 'retire' && selectedCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader>
              <CardTitle>Retire Credits</CardTitle>
              <CardDescription>
                Permanently retire {selectedCredit.quantity} {selectedCredit.unit}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-amber-800 mb-2">⚠️ Warning</p>
                <p className="text-sm text-amber-700">
                  Retiring credits is permanent and cannot be undone. Retired credits cannot be transferred or sold.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold mb-2">Credit Details:</p>
                <p className="text-sm text-muted-foreground">Token: {selectedCredit.tokenId}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {selectedCredit.quantity} {selectedCredit.unit}
                </p>
                <p className="text-sm text-muted-foreground">Project: {selectedCredit.projectName}</p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowActionModal(null)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRetire}
                  disabled={isLoading}
                >
                  {isLoading ? 'Retiring...' : 'Retire Credits'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Details Modal */}
      {showActionModal === 'view' && selectedCredit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full shadow-2xl">
            <CardHeader>
              <CardTitle>Credit Details</CardTitle>
              <CardDescription>Complete information about this credit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Token ID</p>
                    <p className="font-mono font-semibold">{selectedCredit.tokenId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(selectedCredit.status)}`}>
                      {selectedCredit.status.charAt(0).toUpperCase() + selectedCredit.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Credit Type</p>
                    <p className="font-semibold">{selectedCredit.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                    <p className="font-semibold text-primary">
                      {selectedCredit.quantity.toLocaleString()} {selectedCredit.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project ID</p>
                    <p className="font-mono text-sm">{selectedCredit.projectId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minted Date</p>
                    <p className="font-semibold">{selectedCredit.mintedDate}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Project Name</p>
                  <p className="font-semibold text-lg">{selectedCredit.projectName}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button onClick={() => setShowActionModal(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
