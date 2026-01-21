import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, RefreshCw, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

interface Order {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  quantity: number;
  color: string;
  payment_method: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "অপেক্ষমাণ", icon: Clock, variant: "secondary" },
  confirmed: { label: "নিশ্চিত", icon: CheckCircle, variant: "default" },
  shipped: { label: "শিপড", icon: Truck, variant: "outline" },
  delivered: { label: "ডেলিভারড", icon: Package, variant: "default" },
  cancelled: { label: "বাতিল", icon: XCircle, variant: "destructive" },
};

const colorNames: Record<string, string> = {
  blue: "নীল",
  black: "কালো",
  white: "সাদা",
  red: "লাল",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:8000';

  const fetchOrders = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error: any) {
      console.error("Fetch orders error:", error);
      toast.error("অর্ডার লোড করতে সমস্যা হয়েছে");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchOrders();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      // For now, since backend doesn't have update, just show message
      // In real app, add PUT /orders/{id} endpoint
      toast.success("স্ট্যাটাস আপডেট হয়েছে (ডেমো)");
    } catch (error: any) {
      console.error("Status update error:", error);
      toast.error("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate("/admin");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    totalRevenue: orders.filter(o => o.status === "delivered").reduce((sum, o) => sum + o.total_amount, 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">অ্যাডমিন ড্যাশবোর্ড</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              রিফ্রেশ
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">নিশ্চিত</p>
            <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">ডেলিভারড</p>
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-muted-foreground">মোট আয়</p>
            <p className="text-2xl font-bold text-primary">৳ {stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-foreground">সকল অর্ডার</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">কোন অর্ডার নেই</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>গ্রাহক</TableHead>
                    <TableHead>ফোন</TableHead>
                    <TableHead>ঠিকানা</TableHead>
                    <TableHead>রং</TableHead>
                    <TableHead>পরিমাণ</TableHead>
                    <TableHead>পেমেন্ট</TableHead>
                    <TableHead>মোট</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="whitespace-nowrap text-sm">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="font-medium">{order.customer_name}</TableCell>
                        <TableCell>
                          <a href={`tel:${order.phone}`} className="text-primary hover:underline">
                            {order.phone}
                          </a>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate" title={order.address}>
                          {order.address}
                        </TableCell>
                        <TableCell>{colorNames[order.color] || order.color}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>
                          {order.payment_method === "cod" ? "COD" : "বিকাশ/নগদ"}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳ {order.total_amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue>
                                <div className="flex items-center gap-2">
                                  <StatusIcon className="w-4 h-4" />
                                  {status.label}
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([key, config]) => {
                                const Icon = config.icon;
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="w-4 h-4" />
                                      {config.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
