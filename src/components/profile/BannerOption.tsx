type BannerOptionProps = {
    type: "whale" | "waves" | "beach" | "gator";
    color: string;
    banner: string;
    setBanner: (banner: string) => void;
    className?: string;
};

export function BannerOption({
    type,
    color,
    banner,
    setBanner,
    className,
}: BannerOptionProps) {
    let src;
    let bg;

    if (type === "whale") {
        src = "/img/profile/WhaleNew.png";
        bg = color;
    } else if (type === "waves") {
        src = `/img/profile/Waves${color[0].toUpperCase() + color.slice(1).toLowerCase()
            }.png`;
    } else if (type === "beach") {
        src = "/img/profile/BeachDay.png";
    } else if (type === "gator") {
        src = `/img/profile/Gator${color[0].toUpperCase() + color.slice(1).toLowerCase()
            }.png`;
    }

    const onClick = function () {
        setBanner(`${type}/${color}`);
    };

    return (
        <img
            className={`flex-grow-1 w-full h-auto mr-2 rounded-md transition cursor-pointer border-2 ${banner === `${type}/${color}`
                    ? "border-indigo-600 shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-indigo-600"
                } ${bg ? `bg-${color}` : ""}`}
            src={src}
            onClick={onClick}
            alt="banner"
        />
    );
}
