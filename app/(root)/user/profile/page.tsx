import { getSession } from "@/lib/actions/user.actions";
import { getUserOrders } from "@/lib/actions/order.actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { integralCF } from "@/lib/fonts";
import { formatCurrency } from "@/lib/utils";
import { Package, User, MapPin, Clock } from "lucide-react";
import type { Order } from "@/types";
import Breadcrumb from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile information",
};

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  PROCESSING: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  SHIPPED: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export default async function ProfilePage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/user/profile");
  }

  const { user } = session;
  const orders = await getUserOrders() as Order[];

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Account" },
        ]}
      />

      <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold mb-8`}>
        MY ACCOUNT
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <div className="lg:col-span-1">
          <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#F0F0F0] dark:bg-[#1F1F1F] flex items-center justify-center">
                {user.image ? (
                  <Image src={user.image} alt={user.name} width={64} height={64} className="rounded-full" />
                ) : (
                  <User className="w-8 h-8 text-black/40 dark:text-white/40" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-sm text-black/60 dark:text-white/60">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-xl">
                <Package className="w-5 h-5 text-black/60 dark:text-white/60" />
                <div>
                  <p className="text-sm text-black/60 dark:text-white/60">Total Orders</p>
                  <p className="font-bold">{orders.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-xl">
                <Clock className="w-5 h-5 text-black/60 dark:text-white/60" />
                <div>
                  <p className="text-sm text-black/60 dark:text-white/60">Member Since</p>
                  <p className="font-bold">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              <Link
                href="/checkout/shipping"
                className="flex items-center gap-3 p-4 border border-black/10 dark:border-white/10 rounded-xl hover:bg-[#F0F0F0] dark:hover:bg-[#1F1F1F] transition-colors"
              >
                <MapPin className="w-5 h-5 text-black/60 dark:text-white/60" />
                <div>
                  <p className="text-sm text-black/60 dark:text-white/60">Shipping Address</p>
                  <p className="font-medium text-sm">Manage addresses</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="lg:col-span-2">
          <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-6">
            <h2 className="font-bold text-xl mb-6">Order History</h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-black/20 dark:text-white/20 mb-4" />
                <p className="text-black/60 dark:text-white/60 mb-4">No orders yet</p>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center h-12 px-8 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-black/10 dark:border-white/10 rounded-xl p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-black/60 dark:text-white/60">Order ID</p>
                        <p className="font-mono text-sm font-medium">{order.id.slice(0, 8)}...</p>
                      </div>
                      <div>
                        <p className="text-sm text-black/60 dark:text-white/60">Date</p>
                        <p className="font-medium text-sm">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-black/60 dark:text-white/60">Total</p>
                        <p className="font-bold">{formatCurrency(Number(order.totalPrice))}</p>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-wrap gap-2">
                      {order.orderItems.slice(0, 4).map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.slug}`}
                          className="w-14 h-14 rounded-lg overflow-hidden bg-[#F0EEED] dark:bg-[#1F1F1F]"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      ))}
                      {order.orderItems.length > 4 && (
                        <div className="w-14 h-14 rounded-lg bg-[#F0F0F0] dark:bg-[#1F1F1F] flex items-center justify-center text-sm font-medium">
                          +{order.orderItems.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Payment & Delivery Status */}
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-black/10 dark:border-white/10 text-sm">
                      <span className={order.isPaid ? "text-green-600" : "text-yellow-600"}>
                        {order.isPaid ? "Paid" : "Payment Pending"}
                      </span>
                      <span className={order.isDelivered ? "text-green-600" : "text-black/60 dark:text-white/60"}>
                        {order.isDelivered
                          ? `Delivered on ${formatDate(order.deliveredAt!)}`
                          : "Not delivered yet"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
