import {
  faBoxesPacking,
  faBullhorn,
  faCoins,
  faDashboard,
  faDatabase,
  faShop,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const accessSideBar = [
  { name: "dashboard", link: "/dashboard", icon: faDashboard },
  { name: "customer bill", link: "/bills/customer/months", icon: faShop },
  { name: "cnf bill", link: "/bills/cnf/months", icon: faShop },
  { name: "packing list", link: "/bills/packing/months", icon: faBoxesPacking },
  { name: "customer list", link: "/customers", icon: faUsers },
  { name: "finance", link: "/finance", icon: faCoins },
  { name: "balance", link: "/balance", icon: faCoins },
  { name: "marketing", link: "/marketing", icon: faBullhorn },
  { name: "admin dashboard", link: "/admin-dashboard", icon: faDatabase },
];

export const accessControl = [
  {
    role: "owner",
    access: accessSideBar,
  },
  {
    role: "admin",
    access: accessSideBar.filter(
      (item) => !["finance", "balance"].includes(item.name)
    ),
  },
  {
    role: "hr",
    access: accessSideBar.filter(
      (item) =>
        ![
          "finance",
          "balance",
          "customer bill",
          "cnf bill",
          "packing list",
        ].includes(item.name)
    ),
  },
  {
    role: "it manager",
    access: accessSideBar.filter((item) =>
      ["admin dashboard"].includes(item.name)
    ),
  },
  {
    role: "marketing",
    access: accessSideBar.filter((item) => ["marketing"].includes(item.name)),
  },
];

export const isAccessModule = (accessSideBar, value) => {
  const hasAccess = accessSideBar.some((item) => item.link === value);

  return hasAccess;
};
