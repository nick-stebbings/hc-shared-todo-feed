import React, { ReactElement, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Skeleton from "react-loading-skeleton";

import { RouteComponentProps } from "react-router-dom";
import { RootState } from "app/store";

import { getRequestStatus } from "features/ui/selectors";
import { getStringId } from "features/cell/selectors";

const mapState = (state: RootState) => {
  return {
    loading: getRequestStatus(state) === "LOADING",
    errorMsg: "ERROR",
    cellIdString: getStringId(state),
  };
};

// const dispatch = useAppDispatch();
const connector = connect(mapState, null);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps extends RouteComponentProps<{}> {}
type Props = PropsFromRedux & OwnProps;

const withNotifications = <P extends Props>(
  WrappedComponent: React.ComponentType<P>,
  actionCreator: any
) => {
  const C: React.FC<Props> = (props) => {
    // const dispatchAction = async () =>
    // dispatch(actionCreator(cellIdString));
    debugger;
    console.log("props :>> ", props);
    console.log("props2 :>> ", WrappedComponent);
    // useEffect(async () => {
    //   if (props.cellIdString) {
    //     // await dispatchAction();
    //     debugger;
    //     // setOtherUserProfiles(store.getState().user?.knownProfiles);
    //   }
    // }, []);

    return true ? (
      <React.Fragment>
        {new Array(9).map((_, index) => (
          <Skeleton key={index} count={1} width={320} height={400} />
        ))}
      </React.Fragment>
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return C;
};

export default (component: React.ComponentType<P>) =>
  withNotifications(connector(component), 1);
