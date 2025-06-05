// app/layout.jsx
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Post Management System",
  description: "Manage your posts efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Post Manager
            </a>
          </div>
        </nav>
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
