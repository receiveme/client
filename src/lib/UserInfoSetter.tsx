import { useConnectKit } from "@particle-network/connect-react-ui";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../lib/context_particle";
import { useAppState } from "../hooks/useAppState";
import { useAuthToken } from "../state/auth-token.atom";
import { getUserDataByUuid } from "../actions";
import { useRouter } from "next/navigation";

const UserInfoSetter = () => {
    const ranOnce = useRef(false);
    const [appState, setAppState] = useAppState();

    const connectKit = useConnectKit();
    const userInfo = connectKit?.particle?.auth.getUserInfo();

    const { authToken } = useAuthToken();

    const router = useRouter();

    useEffect(() => {
        console.log("running fetch data");
        if (!userInfo) return;
        if (authToken) return;
        if (ranOnce.current) return;
        ranOnce.current = true;
        const fetchData = async () => {
            console.log(appState.userData, "appState.userData");
            if (!appState.userData) {
                // Assuming userInfo has a uuid property
                // const uuid = JSON.parse(localStorage.getItem("globalId"))
                //     ? JSON.parse(localStorage.getItem("globalId"))
                //     : "n/a";
                const userData = userInfo
                    ? await getUserDataByUuid(userInfo.uuid)
                    : null;

                console.log({ userData, userInfo });

                if (!userData && userInfo) {
                    setAppState({
                        userInfo,
                    });
                    router.push("/onboard");
                } else {
                    setAppState({
                        userData,
                    });
                }
            }
        };

        // if (connected) {
        fetchData();
        // }
    }, [userInfo]);

    return null;
};

export default UserInfoSetter;
