import clsx from 'clsx'
import React from "react";

export function Container({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={clsx('mx-auto px-4 sm:px-6 lg:px-8', className)}
            {...props}
        />
    )
}