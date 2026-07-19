import { Outlet } from "react-router";
import HeaderWithHamburger from "./HeaderWithHamburger";

export default function SiteLayout() {
    return (
        <div className="flex flex-col min-h-dvh">
            <HeaderWithHamburger />
            <main>
                <Outlet />
            </main>
        </div>

    )
}
