type BannerOptionProps = {
    type: "whale" | "waves";
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
        src = `/img/profile/Waves${
            color[0].toUpperCase() + color.slice(1).toLowerCase()
        }.png`;
    }

    const onClick = function () {
        setBanner(`${type}/${color}`);
    };

    return (
        <img
            className={`flex-grow-1 w-full h-12 mr-2 rounded-md transition cursor-pointer border-2 ${
                banner === "red-500"
                    ? "border-indigo-600"
                    : "border-gray-200 hover:border-indigo-600"
            } ${bg ? `bg-${color}` : ""}`}
            src={src}
            onClick={onClick}
            alt="banner"
        />
    );
}
