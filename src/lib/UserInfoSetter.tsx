import { useConnectKit } from "@particle-network/connect-react-ui";
import { useContext, useEffect } from "react";
import { AppContext } from "../lib/context_particle";
import { useAppState } from "../hooks/useAppState";

const UserInfoSetter = () => {
    const [_, setAppState] = useAppState();

    const connectKit = useConnectKit();
    const userInfo = connectKit?.particle?.auth.getUserInfo();

    useEffect(() => {
        if (userInfo) {
            setAppState({ userInfo });
        }
    }, []);

    return null;
};

export default UserInfoSetter;
