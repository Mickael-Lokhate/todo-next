import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-free-solid";

function FloatButton({ color, CustomOnClick, size, iconColor, title }) {
  const btnSize = size ?? 100;
  const sizeGradient = Math.floor(btnSize / 3);
  return (
    <div className="btn-container" onClick={CustomOnClick} title={title}>
      <FontAwesomeIcon icon={faPlus} color={iconColor ?? "white"} size={"2x"} />
      <style jsx>{`
        .btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          z-index: 10;
          width: ${btnSize}px;
          height: ${btnSize}px;
          border-radius: 50%;
          background: black;
          background: radial-gradient(
            circle at ${sizeGradient}px ${sizeGradient}px,
            ${color},
            #555
          );
          bottom: 10px;
          right: 10px;
          filter: drop-shadow(0.5px 0.5px 1px ${color});
          transition: all 0.2s;
        }

        .btn-container:hover {
          transform: scale(0.99);
          opacity: 0.7;
          cursor: pointer;
          filter: none;
        }
      `}</style>
    </div>
  );
}

export default FloatButton;
