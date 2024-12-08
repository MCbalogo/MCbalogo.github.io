const { useEffect } = React;
const { render } = ReactDOM;
const styled = window.styled;

const GLITCH_CHARS = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('')

const ReadableChar = styled.span``;
const GlitchyChar = styled.span``;

const GlitchyText = ({ children, ...props }) => {
  return (
    <h1 {...props} className={`glitchy-text ${props.className}`}>
      <ReadableChar className="glitchy-text__char--readable">
        {children}
      </ReadableChar>
      {children.split('').map((char, idx) => {
        const charStyle = {
          '--count': Math.random() * 5 + 1,
        };
        for (let i = 0; i < 10; i++) {
          charStyle[`--char-${i}`] = `"${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}"`;
        }
        return (
          <GlitchyChar
            className="glitchy-text__char"
            aria-hidden={true}
            data-char={char}
            key={`glitch-char--${idx}`}
            style={charStyle}>
            {char}
          </GlitchyChar>
        );
      })}
    </h1>
  );
}

const Logo = ({ className }) => {
  return (
    <svg
      className={`bear-logo ${className}`}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="100" fill="red" />
    </svg>
  );
};

const App = () => {
  return (
    <div>
      <GlitchyText>The page you are looking for cannot be found</GlitchyText>
      <Logo />
    </div>
  );
};

render(<App />, document.getElementById('app'));
