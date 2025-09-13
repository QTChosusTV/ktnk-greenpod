"use client";

import Image from "next/image";
import Link from "next/link";
import './globals.css';
import { useEffect, useState } from "react";
import AnimatedContent from "../../components/reactbits/AnimatedContent/AnimatedContent";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
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
      <div>
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
          <section
            id="main-content"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              marginRight: "50px",
              marginTop: "100px",
            }}
          >
            <div
              style={{
                width: "70%",
                textAlign: "center",
                marginLeft: "50px",
              }}
            >
              <p className="header-1">Viên Ươm Hữu Cơ – Khởi Nguồn Sự Sống</p>
              <p className="header-2">
                Giải pháp nông nghiệp thông minh, tăng tỉ lệ nẩy mầm, giảm chi phí, nâng cao hiệu quả mùa vụ.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link className="button-about" href="/about">
                  Tìm Hiểu Thêm
                </Link>
              </div>
            </div>

            <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
              <Image src="/assets/images/main.png" alt="Main" width={400} height={400} />
            </div>
          </section>
        </AnimatedContent>
      </div>
  );
}
