import { dbConnect } from "@/lib/db.connection";

export async function DbProvider({ children }) {
    const conn = await dbConnect();
     console.log(`Connected to database: ${conn.name}, readyState: ${conn.readyState}`); 
    return (
        <>
            {children}  
        </>
    );
}