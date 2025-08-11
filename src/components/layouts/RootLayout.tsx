// import { AppSidebar } from "@/components/app-sidebar";
// import { contentBg } from "@/assets/images";
// import { useEffect, useRef, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "@/components/common/Navbar";
// import checkAccessToken from "@/utils/checkAccessToken";
// import { useLogout } from "@/features/Auth/authHooks";
// import { useUIStore } from "@/store/useUIStore";
// import { SidebarProvider } from "../ui/sidebar";
// import useScrollToTop from "@/hooks/useScrollToTop";

// const RootLayout = () => {
//   const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
//   const [isLoading, setIsLoading] = useState(true);
//   const [open, setOpen] = useState(true);
//   const actionBar = useUIStore((state) => state.actionBar);
//   const hideUserActionBar = useUIStore((state) => state.hideActionBar);
//   useScrollToTop(containerRef);

//   const currentPath = window.location.pathname;

//   useEffect(() => {
//     hideUserActionBar();
//   }, [hideUserActionBar, currentPath]);

//   const handleImageLoad = () => {
//     setIsLoading(false);
//   };

//   const { logout } = useLogout();

//   const { isExpire, hasToken } = checkAccessToken();

//   if (isExpire || !hasToken) {
//     logout();
//   }

//   return (
//     <SidebarProvider open={open} onOpenChange={setOpen}>
//       <div className="relative min-h-screen overflow-hidden">
//         {isLoading && <div className="absolute inset-0 z-0 bg-[#222227]" />}
//         <img
//           loading="lazy"
//           src={contentBg}
//           alt="Background"
//           className="absolute inset-0 z-0 h-full w-full object-cover"
//           onLoad={handleImageLoad}
//         />
//         <div className="relative z-10 grid h-screen w-screen grid-cols-[auto_1fr] md:gap-4">
//           <AppSidebar open={open} />
//           <main className="scrollbar-hide relative m-2 min-w-0 flex-1 overflow-hidden rounded-2xl bg-cards sm:m-4">
//             <Navbar />
//             <div ref={containerRef} className="relative h-full w-full overflow-auto">
//               <div className="p-4 pt-20">
//                 <Outlet />
//               </div>
//             </div>

//             {actionBar.isVisible && actionBar.component}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default RootLayout;

import React from "react";

const RootLayout: React.FC = () => {
  return <div>RootLayout</div>;
};

export default RootLayout;
