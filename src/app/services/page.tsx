"use client";

import '../globals.css';
import { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [amount, setAmount] = useState<number>(1); 
  const [error, setError] = useState('');  
  const [order_id, setOrderID] = useState<number>(1);  

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
    if (order_id == 1) return amount*45000;
    else if (order_id == 2) return amount*85000;
    else if (order_id == 3) return amount*800000;
    return 0;
  }

  const handleSubmit = async () => {
    try {
      const {data, error} = await supabase
        .from("submissions")
        .insert({
          created_at: new Date().toISOString(),
          name,
          email,
          phone,
          address,
          note,
          amount,
          order_id
        })
        .select()
        .single();
      // console.log(response);
      // alert("Đặt hàng thành công!");
      router.push(`/status?id=${data.id}`);
    } catch (err) {
      setError(
        "Có lỗi xảy ra khi đặt hàng, vui lòng thử lại sau khi refresh (F5). " + error
      );
      return;
    }
  };

  return (
    <main>
        <p className='header-1'>Đặt hàng ngay</p>
        <p className='header-2' style={{fontSize: 25}}>Đặt ngay viên ươm hạt – Giải pháp nông nghiệp thông minh, tăng tỉ lệ nẩy mầm, giảm chi phí, nâng cao hiệu quả mùa vụ.</p> 
        <div className="grid grid-cols-2 gap-4 mx-auto" style={{fontFamily: 'Barlow', maxWidth: 1200, marginTop: 35}}>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Họ và tên *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-input" />
        </div>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Email *</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="text-input" />
        </div>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Số điện thoại *</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="text-input" />
        </div>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Địa chỉ *</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="text-input" />
        </div>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Ghi chú</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} className="text-input" />
        </div>
        <div className="flex flex-col w-1/4">
          <label className='text-input-label'>Số lượng *</label>
          <input type="number" value={amount ?? ""} onChange={(e) => {const val = Math.max(1, Number(e.target.value)); setAmount(val);}} min={1} className="text-input" />
        </div>

        <select value={order_id} onChange={(e) => setOrderID(Number(e.target.value))} className="border rounded p-1" style={{marginTop: 35, height: 50}}>
          <option value={1}>Gói 50 viên (45.000 VND)</option>
          <option value={2}>Gói 100 viên (85.000 VND)</option>
          <option value={3}>Gói 1000 viên (800.000 VND)</option>
        </select>

        <p className='header-2' style={{marginTop: 35, fontFamily: 'Saira', fontWeight: 800}}> Tổng: {calculatePrice(amount ?? 0, order_id ?? 0).toLocaleString("vi-VN")} VND </p>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Gửi đơn hàng
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

      </div>
    </main>
  );
}