import { Suspense } from "react";
import StatusClient from "./StatusClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <StatusClient />
    </Suspense>
  );
}