"use client";

import Image from "next/image";
import "../globals.css";
import { useEffect, useState } from "react";
import AnimatedContent from "../../../components/reactbits/AnimatedContent/AnimatedContent";

export default function About() {
  const [loading, setLoading] = useState(true);

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

  return (
    <main style={{ padding: "20px" }}>
      {/* About Us */}
      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={0.8}
        ease="power3.out"
        initialOpacity={0.0}
        animateOpacity
        threshold={0.2}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">About Us</p>
            <p className="header-2">
              Chúng tôi, <b>K.T.N.K</b>, tham gia cuộc thi FPT Biz Talent với mong
              muốn mang lại những giải pháp xanh – bền vững cho cộng đồng.
            </p>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image
              src="/assets/images/team2.jpg"
              alt="Team K.T.N.K"
              width={600}
              height={400}
              style={{ borderRadius: 30 }}
            />
          </div>
        </section>
      </AnimatedContent>

      {/* Product Info */}
      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={0.8}
        ease="power3.out"
        initialOpacity={0.0}
        animateOpacity
        threshold={0.2}
        delay={0.6}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">Thông Tin Sản Phẩm</p>
            <p className="header-2" style={{ marginLeft: 20 }}>
              Viên ươm hữu cơ là giải pháp tối ưu hóa quá trình ươm cây con, chế tạo
              từ tổ hợp biocomposite thông minh:
            </p>
            <ul
              style={{
                marginLeft: 40,
                fontSize: 18,
                marginTop: 10,
                color: "#34aa34",
                lineHeight: "1.8",
                fontFamily: "Barlow"
              }}
            >
              <li>
                <b>PHA</b>: polyester tự nhiên từ vi khuẩn, dễ phân hủy sinh học.
              </li>
              <li>
                <b>Tinh bột sắn biến tính</b>: tạo màng polymer bền, bảo vệ hạt giống.
              </li>
              <li>
                <b>Sợi cellulose từ xơ dừa</b>: tăng độ cứng chắc, tạo độ tơi xốp.
              </li>
              <li>
                <b>Than củi + vỏ trứng</b>: giữ ẩm, ngăn mầm bệnh, bổ sung khoáng Ca,
                Mg, K và vi lượng.
              </li>
            </ul>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image
              src="/assets/images/product.png"
              alt="Viên ươm hữu cơ"
              width={650}
              height={400}
              style={{ borderRadius: 30 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/temp.png";
              }}
            />
          </div>
        </section>
      </AnimatedContent>

      {/* Target Customers */}
      <AnimatedContent
        distance={50}
        direction="vertical"
        duration={0.8}
        ease="power3.out"
        initialOpacity={0.0}
        animateOpacity
        threshold={0.2}
        delay={1.2}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">Đối Tượng Khách Hàng</p>
            <ul
              style={{
                marginLeft: 20,
                fontSize: 22,
                color: "#34aa34",
                lineHeight: "1.8",
                fontFamily: "Barlow",
                marginTop: 20
              }}
            >
              <li>Nông dân nhỏ lẻ, hộ gia đình làm nông.</li>
              <li>Người yêu thích trồng trọt tại nhà.</li>
              <li>Các tổ chức giáo dục, trung tâm hướng nghiệp.</li>
              <li>
                Người tiêu dùng có điều kiện kinh tế, quan tâm đến sản phẩm xanh.
              </li>
            </ul>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image
              src="/assets/images/farmer1.jpg"
              alt="Khách hàng mục tiêu"
              width={650}
              height={400}
              style={{ borderRadius: 30 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/temp.png";
              }}
            />
          </div>
        </section>
      </AnimatedContent>
    </main>
  );
}
