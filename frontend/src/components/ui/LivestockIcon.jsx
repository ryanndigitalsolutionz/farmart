import cattleRaw from "../../assets/icons/livestock/cattle.svg?raw";
import goatRaw from "../../assets/icons/livestock/goat.svg?raw";
import sheepRaw from "../../assets/icons/livestock/sheep.svg?raw";
import poultryRaw from "../../assets/icons/livestock/poultry.svg?raw";

const ICONS = {
  cattle: cattleRaw,
  goat: goatRaw,
  sheep: sheepRaw,
  poultry: poultryRaw,
};

export default function LivestockIcon({ type = "cattle", size = 48, className, style, ...props }) {
  const raw = ICONS[type];
  if (!raw) return null;

  return (
    <span
      role="img"
      aria-label={`${type} icon`}
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        color: "currentColor",
        ...style,
      }}
      {...props}
      dangerouslySetInnerHTML={{ __html: raw }}
    />
  );
}
