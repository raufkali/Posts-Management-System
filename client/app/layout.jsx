// app/layout.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Post Management System",
  description: "Manage your posts efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
