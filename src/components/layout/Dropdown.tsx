'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import type { NavChild } from './Header';

type GalleryDropdownProps = {
  items: NavChild[];
  isActive: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GalleryDropdown({
  items,
  isActive,
  open,
  onOpenChange,
}: GalleryDropdownProps) {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={`
            text-[15px] font-semibold uppercase transition-colors
            ${
              isActive || open
                ? 'text-[#75B553]'
                : 'text-[#1C2537] hover:text-[#75B553]'
            }
          `}
        >
          GALLERY
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="center"
          sideOffset={18}
          collisionPadding={24}
          className="
            relative z-30 w-60
            rounded-[22px]
            border border-white/25
            bg-[rgba(26,39,61,0.9)]
            shadow-[0_22px_55px_rgba(0,0,0,0.65)]
            backdrop-blur-[18px]
            overflow-hidden
          "
        >
          {/* top tab shape */}
          <div
            className="
              pointer-events-none
              absolute left-7 -top-5
              h-6 w-24
              rounded-t-[999px] rounded-b-[18px]
              border border-white/35 border-b-transparent
              bg-[rgba(26,39,61,0.96)]
            "
          />

          <ul className="relative z-10 py-3 pt-5">
            {items.map(item => (
              <DropdownMenu.Item
                key={item.href}
                asChild
                className="
                  outline-none
                  data-[highlighted]:bg-white/10
                  data-[highlighted]:text-white
                "
              >
                <Link
                  href={item.href}
                  className="
                    block px-5 py-2.5
                    text-[12px] font-semibold tracking-[0.16em]
                    uppercase
                    text-white/90
                  "
                >
                  {item.label}
                </Link>
              </DropdownMenu.Item>
            ))}
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
