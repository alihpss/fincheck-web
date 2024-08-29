import { CrossCircledIcon } from "@radix-ui/react-icons";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, name, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            `bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px]
          text-gray-800 peer pt-4 placeholder-shown:pt-0 focus:border-gray-800
          transition-all outline-none`,
            { "!border-red-900": !!error }
          )}
          placeholder=""
        />

        <label
          htmlFor={inputId}
          className={cn(
            `absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5
              peer-placeholder-shown:left-[13px] transition-all`,
            className
          )}
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
