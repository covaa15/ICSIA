import { ThemeProvider } from './componentes/ThemeContext.jsx';
import { ControlesTema } from './componentes/ControlesTema.jsx';
import { BotonPreview } from './componentes/BotonPreview.jsx';
import { TextoPreview } from './componentes/TextoPreview.jsx';
import { CardPreview } from './componentes/CardPreview.jsx';
import "./css/style.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="layout">

        <ControlesTema />

        <main className="panel-preview">
          <h2>Vista Previa de Componentes</h2>

          <section>
            <h3>Botón de Ejemplo</h3>
            <BotonPreview />
          </section>

          <section>
            <h3>Texto de Ejemplo</h3>
            <TextoPreview />
          </section>

          <section>
            <h3>Tarjeta de Ejemplo</h3>
            <CardPreview />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
