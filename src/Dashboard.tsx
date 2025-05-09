import { Heading, HStack, Separator, Spacer } from "@chakra-ui/react";
import DashboardButton from "./DashboardButton";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function Dashboard() {
    const { logout } = useAuth();

    return (
        <>
            <HStack as="nav" p="5" className="dashboard">
                <Heading textStyle={"3xl"} ml="5">
                    Arelat
                </Heading>
                <Spacer />
                <HStack mr="5">
                    <Link to="/">
                        <DashboardButton>Home</DashboardButton>
                    </Link>

                    <DashboardButton onClick={logout}>Logout</DashboardButton>
                </HStack>
            </HStack>
            <Separator mb="10" />
            <Outlet />
        </>
    );
}

export default Dashboard;
