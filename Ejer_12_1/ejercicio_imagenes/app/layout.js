import "./globals.css";

export const metadata = {
  title: "Gestor de Imagenes",
  description: "Sube y busca imagenes por contenido usando IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}