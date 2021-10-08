import React from "react";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
const MockConductor = require("@holo-host/mock-conductor");
const { ZOME_CALL_TYPE } = MockConductor;
import { CellId } from "@/services/redux-middleware";
import { Buffer } from "buffer";
import { AppWebsocket, AdminWebsocket } from "@holochain/conductor-api";

import { ProfileCard } from "./ProfileCard";
type ComponentProps = React.ComponentProps<typeof ProfileCard>;

function renderUI(props: ComponentProps) {
  return render(<ProfileCard {...props} />);
}

import { userAvatar } from "./testImage";
const testUsername = "Davey";
const PORT = "8888";
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
const appId = "test-app";
const testZomePayload: ZomeCallPayload = {
  cap: null,
  cell_id: "test-id",
  zome_name: "test_zome",
  fn_name: "test-fn",
  provenance: "test-prov",
  payload: { number: 1 },
};

// Given a fresh session (no registered user)
// When the users have been fetched
// Then we can see an input labelled Username
// And the input has a fixed length of 20 chars
// Then we can see a label for the input
// And the label renders the text 'Username:'
// Then we can see a button labelled 'Sign Up'
// Given a user has already registered with this agent key
// When the users have been fetched
// Then we can see the current user name
// And the username is in a span element
// Then we can see an avatar
// And the avatar is in a div element

describe("<ProfileCard>", () => {
  describe("with a fresh session", () => {
    it("renders an input element for username registration", () => {
      const { queryByPlaceholderText } = renderUI({});
      const inputElement = screen.queryByPlaceholderText(
        "Pick a user nickname"
      );

      expect(inputElement).toBeInTheDocument();
      expect(inputElement?.nodeName).toBe("INPUT");
      expect(inputElement).toHaveAttribute("name", "user-nickname");
    });
    it("renders a label for the input", () => {
      const { queryByPlaceholderText } = renderUI({});
      const inputElement = queryByPlaceholderText("Pick a user nickname");
      const labelElement = screen.getByText(/Nickname/);

      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveAttribute("for", "user-nickname");
    });
    it("renders a button for triggering registration", () => {
      renderUI({});
      const buttonElement = screen.getByText("Register");

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute("type", "submit");
    });

    describe("<button> is clicked and the form is VALID", () => {
      var mockHolochainConductor: any;
      const mockCallZomeFn = async () => {
        const expectedResponse = {
          field1: "value1",
        };
        mockHolochainConductor.once(ZOME_CALL_TYPE, testZomePayload);

        const adminWebsocket = await AppWebsocket.connect(
          `ws://localhost:${PORT}`
        );
        const response = await adminWebsocket.callZome(testZomePayload);
        expect(response).toEqual(expectedResponse);
      };
      beforeAll(() => {
        mockHolochainConductor = new MockConductor(PORT);
      });

      afterEach(() => {
        mockHolochainConductor.clearResponses();
        return mockHolochainConductor.closeApps();
      });

      afterAll(() => {
        return mockHolochainConductor.close();
      });

      it("calls handleSubmit", () => {});

      it("becomes disabled and says loading while waiting", async () => {
        renderUI({});
        const buttonElement = screen.getByRole("button");

        userEvent.type(screen.getByLabelText(/Nickname/i), testUsername);
        userEvent.click(screen.getByText(/Register/i));
        const loadingState = await screen.findByText(/loading/);

        expect(loadingState).toBeInTheDocument();
        expect(buttonElement).toBeDisabled();
      });
      test("a message is returned with a confirmation", () => {});
    });
    describe("<button> is clicked and the form is INVALID", () => {
      it("is disabled", () => {});
      test("there is a prompt text next to the invalid field", () => {});
    });
  });

  describe("when a user has already registered", () => {
    it("renders a span element with the username", () => {
      const name = "Davey";
      renderUI({ nickname: name });

      const spanElement = screen.getByText(new RegExp(name));
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.nodeName).toBe("SPAN");
    });

    it("renders a div element with the avatar inside", () => {
      const { getByAltText } = renderUI({
        nickname: "Nick",
        avatar: userAvatar,
      });
      const img = screen.getByAltText("User Avatar");
      const div = img.parentNode;

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", `data:image/png;base64,${userAvatar}`);
      expect(div).toBeDefined();
      expect(div).toBeInTheDocument();
      expect(div!.nodeName).toBe("DIV");
    });
  });
});
