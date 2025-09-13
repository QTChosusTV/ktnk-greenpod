"use client";

import Image from "next/image";
import '../globals.css';
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
      <AnimatedContent  
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
          delay={0.0}
      >
        <section style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", marginBottom: "30px", marginTop: "-20px"}}>
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">About Us</p>
            <p className="header-2">
              Chúng tôi, <b>K.T.N.K</b>,
              tham gia cuộc thi FPT Biz Talent với mong muốn mang lại những giải pháp xanh – bền vững
              cho cộng đồng.
            </p>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image src="/assets/images/team2.jpg" alt="Team K.T.N.K (chua co)" width={600} height={200} style={{marginTop: 100, borderRadius: 30}} />
          </div>
        </section>
      </AnimatedContent>

      <AnimatedContent  
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
          delay={1.0}
      >
        <section style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: "20px", marginBottom: "30px"}}>
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">Thông Tin Sản Phẩm</p>
            <p className="header-2" style={{textAlign: "left", marginLeft: 50}}>
              - Viên ươm hữu cơ là giải pháp tối ưu hóa quá trình ươm cây con, được chế tạo từ tổ hợp biocomposite thông minh kết hợp nhiều vật liệu sinh học thân thiện với môi trường:
            </p>
            <p className="header-2" style={{textAlign: "left", marginLeft: 60, fontSize: 20, marginTop: -20, color: '#34aa34'}}>
                <br />  ● PHA (Polyhydroxyalkanoates): polyester tự nhiên tổng hợp từ vi khuẩn ăn dầu cọ hoặc đường mía, dễ phân hủy sinh học.
                <br />  ● Tinh bột sắn biến tính: xử lý để tạo màng polymer bền vững, bảo vệ hạt giống.
                <br />  ● Sợi cellulose từ xơ dừa: tăng độ cứng chắc nhờ cấu trúc sợi tự nhiên, tạo độ tơi xốp cho đất.
                <br />  ● Than củi + vỏ trứng gà: giúp giữ ẩm, ngăn mầm bệnh, bổ sung khoáng chất như Ca, Mg, K và các vi lượng cần thiết.
            </p>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image src="/assets/images/product.png" alt="Vien Uom Huu Co (chua co)" width={650} height={350} style={{marginTop: 50, marginLeft: 50, borderRadius: 30}} />
          </div>
        </section>
      </AnimatedContent>

      <AnimatedContent  
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
          delay={2.0}
      >
        <section style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", marginBottom: "30px"}}>
          <div style={{ width: "60%", textAlign: "left" }}>
            <p className="header-1">Đối Tượng Khách Hàng</p>
            <p className="header-2" style={{textAlign: "left", marginLeft: 20, color: '#34aa34', fontSize: 25}}>
              ● Nông dân nhỏ lẻ, hộ gia đình làm nông.<br />
              ● Người yêu thích trồng trọt tại nhà.<br />
              ● Các tổ chức giáo dục, trung tâm hướng nghiệp.<br />
              ● Người tiêu dùng có điều kiện kinh tế, quan tâm đến sản phẩm xanh.<br />
            </p>
          </div>
          <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <Image src="/assets/images/farmer1.jpg" alt="Vien Uom Huu Co (chua co)" width={650} height={350} style={{marginTop: 50, marginLeft: 50, borderRadius: 30}} />
          </div>
        </section>
      </AnimatedContent>
    </main>
  );
}
