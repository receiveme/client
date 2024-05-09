import { useConnectKit } from "@particle-network/connect-react-ui";
import { useContext, useEffect } from "react";
import { AppContext } from "../lib/context_particle";
import { useAppState } from "../hooks/useAppState";
import { connect } from "http2";

const UserInfoSetter = () => {
    const [_, setAppState] = useAppState();

    const connectKit = useConnectKit();
    console.log(connectKit, " connectKit");
    const userInfo = connectKit?.particle?.auth.getUserInfo();

    console.log({ userInfo: JSON.stringify(userInfo) }, "userinfo setter");

    useEffect(() => {
        if (userInfo) {
            setAppState({ userInfo });
        }
    }, []);

    return null;
};

export default UserInfoSetter;
