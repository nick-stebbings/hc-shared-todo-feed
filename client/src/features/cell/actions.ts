import { CellId } from "@services/redux-middleware";
const SET_CELL_ID = "cell/setCellIdString";

const setCellId = (cellId: CellId) => {
  return {
    type: SET_CELL_ID,
    payload: cellId,
  };
};
export { setCellId };
