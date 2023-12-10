import React from "react";
import Link from "next/link";
import Logout from "@/app/logout/page";
import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    ref: "/admin",
    color: "text-gray-700",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    ref: "/admin",
    color: "text-gray-700",
  },
  {
    label: "Upload",
    icon: InboxArrowDownIcon,
    ref: "/insertdata",
    color: "text-gray-700",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    ref: "/admin",
    color: "text-gray-700",
  },
  {
    label: "Log Out",
    icon: PowerIcon,
    ref: "/logout",
    color: "text-red-700",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="Ainur Rofiq"
            className="border border-gray-900 p-0.5"
            src="https://media.licdn.com/dms/image/C4E03AQF2K53Gsng_ow/profile-displayphoto-shrink_800_800/0/1639940308472?e=1707350400&v=beta&t=Z4VGwIwuh8odO3Hd0jFbGwJgz-XP7SY5k5F8N4ol3tM"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, ref, color }, key) => {
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded hover:bg-blue-gray-500/10 focus:bg-blue-gray-500/10  active:bg-blue-gray-500/10"
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${color}`,
                strokeWidth: 2,
              })}
              <Typography as="span" variant="small" className="font-normal">
                <Link className={`${color}`} href={ref}>
                  {label}
                </Link>
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          DFflex
        </Typography>

        <ProfileMenu />
      </div>
    </Navbar>
  );
}
