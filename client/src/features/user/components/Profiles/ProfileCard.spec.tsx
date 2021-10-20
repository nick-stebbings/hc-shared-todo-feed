// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";

// import userEvent from "@testing-library/user-event";
// const MockConductor = require("@holo-host/mock-conductor");
// const { ZOME_CALL_TYPE } = MockConductor;
// import { CellId } from "services/redux-middleware";
// import { Buffer } from "buffer";
// import { AppWebsocket, AdminWebsocket } from "@holochain/conductor-api";
// const PORT = "8888";

// import { ProfileCard } from "./ProfileCard";
// type ComponentProps = React.ComponentProps<typeof ProfileCard>;

// //Test Helpers
// function renderUI(props: ComponentProps) {
//   return render(<ProfileCard {...props} />);
// }

// // Mocks
// import { userAvatar } from "./testImage";
// const testUsername = "Davey";
// const testInput = {
//   nickname: testUsername,
//   fields: { avatar: userAvatar },
// };
// interface ZomeInput {
//   number: number;
// }
// interface ZomeCallPayload {
//   cap: Buffer | null;
//   cell_id: CellId;
//   zome_name: string;
//   fn_name: string;
//   provenance: Buffer;
//   payload: ZomeInput;
// }
// const appId = "test-app";
// const testZomePayload: ZomeCallPayload = {
//   cap: null,
//   cell_id: "test-id",
//   zome_name: "test_zome",
//   fn_name: "test-fn",
//   provenance: Buffer.from("test"),
//   payload: { number: 1 },
// };

// describe("<ProfileCard>", () => {
//   describe("with a fresh session", () => {
//     it("renders an input element for username registration", () => {
//       const { queryByPlaceholderText } = renderUI({});
//       const inputElement = screen.queryByPlaceholderText(
//         "Pick a user nickname"
//       );

//       expect(inputElement).toBeInTheDocument();
//       expect(inputElement?.nodeName).toBe("INPUT");
//       expect(inputElement).toHaveAttribute("name", "user-nickname");
//     });
//     it("renders a label for the input", () => {
//       const { queryByPlaceholderText } = renderUI({});
//       const inputElement = queryByPlaceholderText("Pick a user nickname");
//       const labelElement = screen.getByText(/Nickname/);

//       expect(labelElement).toBeInTheDocument();
//       expect(labelElement).toHaveAttribute("for", "user-nickname");
//     });
//     it("renders a button for triggering registration", () => {
//       renderUI({});
//       const buttonElement = screen.getByText("Register");

//       expect(buttonElement).toBeInTheDocument();
//       expect(buttonElement).toHaveAttribute("type", "submit");
//     });

//     describe("<button> is clicked and the form is VALID", () => {
//       var mockHolochainConductor: any;
//       const mockCallZomeFn = jest.fn(() =>
//         (async () => {
//           const expectedResponse = {
//             field1: "value1",
//           };
//           mockHolochainConductor.once(ZOME_CALL_TYPE, testZomePayload);

//           const adminWebsocket = await AppWebsocket.connect(
//             `ws://localhost:${PORT}`
//           );
//           const response = await adminWebsocket.callZome(testZomePayload);
//           return expect(response).toEqual(expectedResponse);
//         })()
//       );
//       beforeAll(() => {
//         mockHolochainConductor = new MockConductor(PORT);
//       });

//       afterEach(() => {
//         mockHolochainConductor.clearResponses();
//         return mockHolochainConductor.closeApps();
//       });

//       afterAll(() => mockHolochainConductor.close());

//       it("becomes disabled and says loading while waiting", async () => {
//         renderUI({ handleSubmit: mockCallZomeFn });
//         const buttonElement = screen.getByRole("button");

//         userEvent.type(screen.getByLabelText(/Nickname/i), testUsername);
//         userEvent.click(screen.getByText(/Register/i));
//         const loadingState = await screen.findByText(/loading/);

//         expect(loadingState).toBeInTheDocument();
//         expect(buttonElement).toBeDisabled();
//       });

//       it("calls zomeFn register nickname", async () => {
//         renderUI({});

//         userEvent.type(screen.getByLabelText(/Nickname/i), testUsername);
//         userEvent.click(screen.getByText(/Register/i));

//         expect(mockCallZomeFn).toHaveBeenCalledTimes(1);
//       });
//       it("returns message with a confirmation", () => {});
//     });
//     describe("<button> is clicked and the form is INVALID", () => {
//       it("is disabled", () => {});
//       test("there is a prompt text next to the invalid field", () => {});
//     });
//   });

//   describe("when a user has already registered", () => {
//     it("renders a span element with the username", () => {
//       renderUI({ userProfile: testInput });

//       const spanElement = screen.getByText(new RegExp(testUsername));
//       expect(spanElement).toBeInTheDocument();
//       expect(spanElement.nodeName).toBe("SPAN");
//     });

//     it("renders a div element with the avatar inside", () => {
//       const { getByAltText } = renderUI({ userProfile: testInput });
//       const img = screen.getByAltText("User Avatar");
//       const div = img?.parentNode;

//       expect(div).toBeDefined();
//       expect(div).toBeInTheDocument();
//       expect(img).toBeInTheDocument();
//       expect(img).toHaveAttribute("src", `data:image/png;base64,${userAvatar}`);
//       expect(div!.nodeName).toBe("DIV");
//     });
//   });
// });
