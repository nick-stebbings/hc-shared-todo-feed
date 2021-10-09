import { CellId } from "@services/redux-middleware";
const SET_CELL_ID = "SET_CELL_ID";

const setCellId = (cellId: CellId) => {
  return {
    type: SET_CELL_ID,
    payload: cellId,
  };
};
export { setCellId };
