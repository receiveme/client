import { useCoinflipAnimation } from "@/src/hooks/useCoinflipAnimation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog";
import { cn } from "@/src/lib/utils/cn";

export const PoapBadge = ({
    image,
    eventName,
    eventDescription,
}: {
    image: string;
    eventName: string;
    eventDescription: string;
}) => {
    const { className, onMouseEnter } = useCoinflipAnimation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-white rounded-lg p-1"
                    onMouseEnter={onMouseEnter}
                >
                    <img
                        src={image + "?size=small"}
                        className={cn(
                            "w-[28px] h-[28px] rounded-md mx-auto",
                            className,
                        )}
                        alt=""
                    />
                </button>
            </DialogTrigger>
            <DialogContent className="text-center w-full sm:max-w-sm lg:max-w-sm">
                <DialogHeader className="xs:text-xl font-semibold sm:text-center">
                    {eventName}
                </DialogHeader>
                <div className="bg-[#D0369C39] w-min mx-auto whitespace-nowrap text-[#BE0044] py-1 px-2 text-xs rounded-full font-semibold uppercase">
                    POAP
                </div>
                <DialogDescription className="space-y-1 font-medium text-gray-600">
                    {eventDescription.split("\n\n").map((t, i) => {
                        return (
                            <p key={i} className="mt-2">
                                {t}
                            </p>
                        );
                    })}
                </DialogDescription>
                <div className="mt-8">
                    <img
                        src={image + "?size=medium"}
                        className="max-w-[200px] rounded-full mx-auto"
                        alt=""
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
