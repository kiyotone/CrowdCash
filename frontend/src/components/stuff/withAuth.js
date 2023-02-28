import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken } from "./helper";

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const token = getToken();

        useEffect(() => {
            if (!token) {
                router.push("/auth/Login");
            }
        }, [token]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;