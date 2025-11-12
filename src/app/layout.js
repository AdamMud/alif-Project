

// import "./globals.css";
import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Room Booking",
  description: "Booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
