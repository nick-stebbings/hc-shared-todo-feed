// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const MockConductor = require("@holo-host/mock-conductor");
const { ZOME_CALL_TYPE } = MockConductor;

interface ZomeInput {
  number: number;
}
interface ZomeCallPayload {
  cap: Buffer | null;
  cell_id: CellId;
  zome_name: string;
  fn_name: string;
  provenance: Buffer;
  payload: ZomeInput;
}

import { CellId } from "services/redux-middleware";
import { Buffer } from "buffer";
import { AppWebsocket } from "@holochain/conductor-api";
const PORT = "8888";

const appId = "test-app";
const testZomePayload: ZomeCallPayload = {
  cap: null,
  cell_id: "test-id",
  zome_name: "test_zome",
  fn_name: "test-fn",
  provenance: Buffer.from("test"),
  payload: { number: 1 },
};

// Pass a holochain conductor mock and return a jest fn that makes a zome call
const mockCallZomeFn = (mockHolochainConductor: any) =>
  jest.fn(() =>
    (async () => {
      mockHolochainConductor.once(ZOME_CALL_TYPE, testZomePayload);

      const appWebsocket = await AppWebsocket.connect(`ws://localhost:${PORT}`);
      const response = await appWebsocket.callZome(testZomePayload);
      return response;
    })()
  );

export { mockCallZomeFn };
