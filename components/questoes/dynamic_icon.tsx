import * as Icons from "lucide-react";
import { ComponentPropsWithRef } from "react";

interface DynamicIconProps extends ComponentPropsWithRef<"svg"> {
  nome: string;
  size?: number;
}

export function DynamicIcon({
  nome,
  size,
  className,
  ...props
}: DynamicIconProps) {
  if (nome.startsWith("http")) {
    return (
      <img
        src={nome}
        style={{ width: size, height: "auto" }}
        className={className}
        alt={`Icone ${nome}`}
      />
    );
  }

  const IconComponent = Icons[nome as keyof typeof Icons] as React.ElementType;
  if (!IconComponent) return <Icons.HelpCircle size={size} />;

  return <IconComponent size={size} className={className} {...props} />;
}
