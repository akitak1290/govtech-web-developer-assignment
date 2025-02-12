import { ReactNode } from "react";
import Banner from "@components/Banner";

interface LayoutProps {
    children: ReactNode
}

export default function Layout(props: LayoutProps) {
    const { children } = props;
    return (
        <>
            <Banner />
            <main>{children}</main> 
        </>
    );
}
