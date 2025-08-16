"use client";

import "../globals.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

export default function StatusPage() {
  const params = useSearchParams();
  const id = params.get("id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-b-transparent"></div>
      </div>
    );
  }

  function calculatePrice(amount: number, order_id: number): number {
    if (order_id == 1) return amount * 45000;
    else if (order_id == 2) return amount * 85000;
    else if (order_id == 3) return amount * 800000;
    return 0;
  }

  if (!order)
    return <p style={{ color: "#aa2222" }}>Không tìm thấy đơn hàng.</p>;

  return (
    <main className="p-8 font-sans">
      <h1
        className="font-bold mb-4 header-1"
        style={{ textAlign: "left", fontSize: 40 }}
      >
        Thông tin đơn hàng
      </h1>
      <p className="header-2" style={{ textAlign: "left" }}>
        <strong>ID đơn hàng:</strong> {order.id} (Hãy lưu lại ID của đơn hàng để
        kiểm tra lại khi cần thiết.)
      </p>
      <p
        className="header-2"
        style={{ textAlign: "left", fontSize: 20 }}
      ></p>
      <p className="header-2" style={{ textAlign: "left" }}>
        <strong>Status:</strong> {order.status}
      </p>
      <p className="header-2" style={{ textAlign: "left" }}>
        <strong>Giá:</strong>{" "}
        {calculatePrice(order.amount, order.order_id).toLocaleString("vi-VN")}{" "}
        VND
      </p>
      <p className="header-1">
        Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.
      </p>
    </main>
  );
}
