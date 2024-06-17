import { Fragment, ReactNode, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

export const Select = <
    T extends {
        value: string | Record<string, any>;
        label: string | ReactNode;
    },
>({
    options,
    onChange,
    selectedItemRenderer,
}: {
    options: T[];
    onChange?: (selected: T) => void;
    selectedItemRenderer?: (selected: T) => ReactNode;
}) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <Listbox
            value={selected}
            onChange={(v) => {
                onChange?.(v);
                setSelected(v);
            }}
        >
            <div className="relative">
                <Listbox.Button className="relative mt-1 w-full cursor-default rounded-lg pr-8 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                    <span className="block truncate">
                        {selectedItemRenderer
                            ? selectedItemRenderer(selected)
                            : selected.label}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IconChevronDown
                            className="h-5 w-5 text-gray-600"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {options.map((option, i) => {
                            const isSelectedOption =
                                option.value === selected.value;

                            return (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default text-gray-900 select-none py-2 pr-10 pl-4 ${
                                            active ? "bg-gray-100 " : ""
                                        } ${
                                            isSelectedOption
                                                ? "bg-gray-200"
                                                : ""
                                        }`
                                    }
                                    value={option}
                                >
                                    {isSelectedOption ? (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-black">
                                            <IconCheck
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    ) : null}
                                    <span
                                        className={`block truncate ${
                                            isSelectedOption
                                                ? "font-medium"
                                                : "font-normal"
                                        }`}
                                    >
                                        {option.label}
                                    </span>
                                </Listbox.Option>
                            );
                        })}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};
