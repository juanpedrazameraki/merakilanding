import StackTerminal from './StackTerminal';
import StackCards from './stack-cards/StackCards';
import StackArchitecture from './stack-arch/StackArchitecture';

type View = 'terminal' | 'cards' | 'arch';

/* Shell de la sección Tecnologías.
   La versión mostrada la fija el owner (NO el cliente). Hoy: 'arch'.
   Terminal y Cards se conservan listos para cambiar en el futuro: basta
   cambiar el valor de VIEW por 'terminal' o 'cards'. */
const VIEW: View = 'arch';

export default function StackSection() {
  return (
    <section
      id="stack"
      className="mc-darksec"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(64px,9vw,112px) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 78%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 78%)',
          pointerEvents: 'none',
        }}
      ></div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
        }}
      >
        {VIEW === 'terminal' && <StackTerminal />}
        {VIEW === 'cards' && <StackCards />}
        {VIEW === 'arch' && <StackArchitecture />}
      </div>
    </section>
  );
}
