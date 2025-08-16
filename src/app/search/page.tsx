"use client";

import '../globals.css';
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!orderId) {
      setNotFound(true);
      setOrder(null);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setOrder(null);

    const { data } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", orderId)
      .single();

    setLoading(false);

    if (!data) {
      setNotFound(true);
    } else {
      setOrder(data);
    }
  };

  function orderConvert(order_id: number): string {
    if (order_id == 1) return "Gói 50 viên";
    else if (order_id == 2) return "Gói 100 viên";
    else if (order_id == 3) return "Gói 1000 viên";
    return "";
  }

  return (
    <main className="flex items-center justify-center" style={{marginTop: 150}}>
      <div className="bg-white shadow-md rounded-xl p-6" style={{width: 600}}>
        <h1 className="header-1" style={{marginBottom: 15}}>Tra cứu đơn hàng</h1>
        
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Nhập mã đơn hàng"
          className="text-input"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          style={{marginTop: 15, fontFamily: 'Barlow', marginBottom: 5}}
        >
          {loading ? "Đang tìm..." : "Tìm kiếm"}
        </button>

        {notFound && !loading && (
          <p className="text-red-600 mt-4 text-center" style={{fontFamily: 'Barlow'}}>❌ Không tìm thấy đơn hàng hoặc chưa điền ID của đơn hàng</p>
        )}

        {!notFound && !loading && order && (
          <p className="text-green-600 mt-4 text-center" style={{fontFamily: 'Barlow'}}>✅ Đã tìm thấy đơn hàng!</p>
        )}

        {order && (
          <div className="mt-4 border rounded-md p-4 bg-gray-50" style={{fontFamily: 'Barlow'}}>
            <p><strong>Tên:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>SĐT:</strong> {order.phone}</p>
            <p><strong>Địa chỉ:</strong> {order.address}</p>
            <p><strong>Gói:</strong> {orderConvert(order.order_id)}</p>
            <p><strong>Số lượng:</strong> {order.amount}</p>
            <p><strong>Ngày đặt:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
          </div>
        )}
      </div>
    </main>
  );
}
