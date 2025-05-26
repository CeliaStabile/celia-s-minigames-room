
type DrawingProps = {
    error: number,
    className?: string;
}

const Block = ({
  visible,
  className,
}: {
  visible: boolean;
  className: string;
}) => (
  <div className={`absolute ${visible ? "bg-[#f6e3b4]" : ""} ${className}`} />
);

export default function Drawing({ error }:DrawingProps) {


    
    return (
      <div className="relative w-[128px] h-[160px] bg-[#1a1a4a] scale-100">
        {/* Base */}
        <Block visible={error >= 1} className="bottom-0 left-0 h-2 w-full" />

        {/* Pilier vertical */}
        <Block visible={error >= 2} className="bottom-0 left-2 w-2 h-[110px]" />

        {/* Poutre horizontale */}
        <Block visible={error >= 3} className="top-0 left-2 h-2 w-[60px]" />

        {/* Corde */}
        <Block visible={error >= 4} className="top-2 left-[60px] w-1 h-8" />

        {/* Tête */}
        <Block
          visible={error >= 5}
          className="top-10 left-[56px] w-8 h-8 rounded-full"
        />

        {/* Corps */}
        <Block
          visible={error >= 6}
          className="top-[72px] left-[60px] w-1 h-24"
        />

        {/* Bras gauche */}
        <Block
          visible={error >= 7}
          className="top-[80px] left-[44px] w-[20px] h-1 rotate-[30deg]"
        />

        {/* Bras droit */}
        <Block
          visible={error >= 8}
          className="top-[80px] left-[60px] w-[20px] h-1 -rotate-[30deg]"
        />

        {/* Jambe gauche */}
        <Block
          visible={error >= 9}
          className="top-[130px] left-[50px] w-[15px] h-1 rotate-[30deg]"
        />

        {/* Jambe droite */}
        <Block
          visible={error >= 10}
          className="top-[130px] left-[60px] w-[15px] h-1 -rotate-[30deg]"
        />
      </div>
    );
    
}


 