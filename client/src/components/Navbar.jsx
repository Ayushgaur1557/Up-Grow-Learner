import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from './ui/sheet';
import { Separator } from "./ui/separator"; // ✅ Assuming you're importing locally
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';



const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User log out.");
            navigate("/login");
        }
    }, [isSuccess])

    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-42'>
            {/* Desktop */}
            <div className=" max-w-7xl mx-auto hidden md:flex justify-between items-center gap-6 h-full px-4">

                <div className=" flex items-center gap-2 ">  {/*//this is given by me to manage  */}
                    <School size={"30"} />
                    <Link to="/">
                        <h1 className="hidden md:block font-extrabold text-2xl">
                            E-Learning
                        </h1>
                    </Link>

                </div>

                {/* User icons and dark mode icons */}
                <div className="flex items-center gap-8 ml-auto pr-25 ">
                    {
                        user ? (
                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer">
                                        <Avatar className="w-full h-full">
                                            <AvatarImage
                                                src={user?.photoUrl || "https://github.com/shadcn.png"}
                                                alt="@shadcn"
                                                className="w-full h-full object-cover block" />
                                            <AvatarFallback className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56 mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-2 space-y-2 right-0 left-0 mx-auto">
                                    <DropdownMenuLabel className="text-center text-gray-600  dark:text-gray-300 font-semibold">
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="border-t border-gray-300 dark:border-gray-700" />

                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                                            <Link to="my-learning">My Learning</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                                            <Link to="profile"> Edit  Profile</Link>

                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className=" dark:border-gray-700" />
                                        <DropdownMenuItem onClick={logoutHandler} className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer text-red-500 dark:text-red-400 font-semibold">
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {user?.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator className="border-t border-gray-300 dark:border-gray-700" />

                                            <DropdownMenuItem className="p-2 rounded-md cursor-pointer font-semibold bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-white hover:opacity-90 transition">
                                                <Link to="/admin/dashboard" className="block w-full h-full text-white">
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>

                                        </>
                                    )
                                    }


                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )}
                    <DarkMode />
                </div>
            </div>

            {/* Mobile Device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl"> E-learning </h1>
                <MobileNavbar user={user} />
            </div>

        </div>
    );
};

export default Navbar;



const MobileNavbar = ({ user }) => {
    const navigate = useNavigate();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[70%] max-w-xs flex flex-col bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100">

                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle className="text-xl font-bold">
                        <Link to="/" className="hover:text-primary">E-Learning</Link>
                    </SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className="mr-2 my-4 border-gray-300 dark:border-gray-700" />

                <nav className="flex flex-col space-y-3 text-base font-medium items-center">
                    <Link
                        to="/my-learning"
                        className="w-full text-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        My Learning
                    </Link>
                    <Link
                        to="/profile"
                        className="w-full text-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        Edit Profile
                    </Link>
                    <button
                        onClick={() => {
                            toast.success("Logged out");
                            navigate("/login");
                        }}
                        className="w-full text-center px-4 py-2 rounded-md bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-700 transition font-medium"
                    >
                        Log out
                    </button>
                </nav>

                {user?.role === "instructor" && (
                    <SheetFooter className="mt-6">
                        <SheetClose asChild>
                            <Button
                                type="submit"
                                onClick={() => navigate("/admin/dashboard")}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-medium">
                                Dashboard
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};



// <nav className="flex flex-col space-y-3 text-base font-medium">
// <Link to="/my-learning" className="hover:text-primary">
//     My Learning
// </Link>
// <Link to="/profile" className="hover:text-primary">
//     Edit Profile
// </Link>
// <button
//     onClick={() => {
//         toast.success("Logged out");
//         navigate("/login");
//     }}
//     className="text-red-500 hover:underline text-left"
// >
//     Log out
// </button>
// </nav>

// {user?.role === "instructor" && (
// <SheetFooter className="mt-6">
//     <SheetClose asChild>
//         <Button
//             className="w-full"
//             onClick={() => navigate("/admin/dashboard")}
//         >
//             Dashboard
//         </Button>
//     </SheetClose>
// </SheetFooter>
// )}
// </SheetContent>
// </Sheet>
// );
// };
