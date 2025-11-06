
"use client";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";

export default function Home() {
  return (
        <div>
      <Navbar />
      <div
        className=""
        style={{
          background: "linear-gradient(115.92deg, #A3E1EE 3.99%, #FFFFFF 43.48%, #FFFFFF 75.57%, #A3E1EE 99.36%)",
        }}
      >
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
