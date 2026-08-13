import Navbar from "@/components/web/Navbar";
import { ReactNode } from "react";

export default function SharedLayout({children}:{children:ReactNode}) {
    return (
      <>
            <Navbar />
            {children}
      </>
    );
        
    
}