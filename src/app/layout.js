import "./globals.css";

export const metadata = {
  title: "NomNom Food Delivery",
  description: "Order fresh meals with a fast and polished delivery flow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
