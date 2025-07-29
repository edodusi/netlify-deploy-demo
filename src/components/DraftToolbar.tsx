"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DraftToolbar() {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "white",
        padding: "10px",
        textAlign: "center",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <p style={{ margin: 0 }}>You are in draft mode.</p>
      <Link
        href={`/api/disable-draft?redirect=${pathname}`}
        style={{ color: "lightblue", textDecoration: "underline" }}
      >
        Exit draft mode
      </Link>
    </div>
  );
}