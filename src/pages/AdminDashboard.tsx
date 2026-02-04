import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  Truck,
  TrendingUp 
} from "lucide-react";
import { format } from "date-fns";

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  delivered: number;
  revenue: number;
}

interface RecentOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    processing: 0,
    delivered: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all orders
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (orders) {
        const total = orders.length;
        const pending = orders.filter(o => o.status === "pending").length;
        const processing = orders.filter(o => o.status === "processing" || o.status === "shipped").length;
        const delivered = orders.filter(o => o.status === "delivered").length;
        const revenue = orders
          .filter(o => o.status === "delivered")
          .reduce((sum, o) => sum + parseFloat(o.total_amount as any), 0);

        setStats({ total, pending, processing, delivered, revenue });
        setRecentOrders(orders.slice(0, 5) as RecentOrder[]);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "পেন্ডিং", className: "bg-yellow-100 text-yellow-800" },
      processing: { label: "প্রসেসিং", className: "bg-blue-100 text-blue-800" },
      shipped: { label: "শিপড", className: "bg-purple-100 text-purple-800" },
      delivered: { label: "ডেলিভার্ড", className: "bg-green-100 text-green-800" },
      cancelled: { label: "বাতিল", className: "bg-red-100 text-red-800" },
    };
    const s = statusMap[status] || statusMap.pending;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.className}`}>{s.label}</span>;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">ড্যাশবোর্ড</h1>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">পেন্ডিং</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">প্রসেসিং</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ডেলিভার্ড</p>
                  <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট আয় (ডেলিভার্ড অর্ডার থেকে)</p>
                <p className="text-4xl font-bold text-primary">৳{stats.revenue.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">কোনো অর্ডার নেই</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">গ্রাহক</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ফোন</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">মোট</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-2">{order.customer_name}</td>
                        <td className="py-3 px-2">{order.customer_phone}</td>
                        <td className="py-3 px-2 font-medium">৳{order.total_amount}</td>
                        <td className="py-3 px-2">{getStatusBadge(order.status)}</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {format(new Date(order.created_at), "dd/MM/yyyy")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
