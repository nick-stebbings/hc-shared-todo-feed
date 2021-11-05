import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MockConductor = require("@holo-host/mock-conductor");
import { mockCallZomeFn, PORT } from "setupTests";
import api from "services/zomeApis";

import { store } from "app/store";
import { Provider } from "react-redux";
import { initialState } from "features/user/reducer";

import { ProfileCard } from "./ProfileCard";
type ComponentProps = React.ComponentProps<typeof ProfileCard>;

//Helpers

function renderUI(props: ComponentProps) {
  return render(
    <Provider store={store}>
      <ProfileCard {...props} />
    </Provider>
  );
}

// Mocks
import { userAvatar } from "./testImage";
const testUsername = "Davey";
const testInput = {
  nickname: testUsername,
  fields: { avatar: userAvatar },
};

describe("<ProfileCard>", () => {
  describe("Given a fresh session", () => {
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
    describe("Given a valid input value for username and a mock zome call service", () => {
      var mockHolochainConductor: any;

      beforeAll(() => {
        mockHolochainConductor = new MockConductor(PORT);
        api.profiles["create_profile"].create = mockCallZomeFn(
          mockHolochainConductor
        );
      });

      beforeEach(() => {
        renderUI({
          userProfile: initialState.myProfile,
          handleSubmit: mockCallZomeFn,
          setIsValidForm: () => true,
        });
      });

      afterEach(() => {
        mockHolochainConductor.clearResponses();
        return mockHolochainConductor.closeApps();
      });

      afterAll(() => mockHolochainConductor.close());

      it("When <button> is clicked Then it becomes disabled, a message says loading while waiting", async () => {
        const buttonElement = screen.getByText(/Register/i);

        userEvent.type(screen.getByLabelText(/Nickname/i), testUsername);
        userEvent.click(buttonElement);
        const loadingState = await screen.findByText(/loading/i);

        expect(loadingState).toBeInTheDocument();
        expect(buttonElement).toBeDisabled();
      });

      it("And it calls zomeFn register nickname", async () => {
        userEvent.type(screen.getByLabelText(/Nickname/i), testUsername);
        userEvent.click(screen.getByText(/Register/i));

        expect(api.profiles.create_profile.create).toHaveBeenCalledTimes(1);
      });
      describe("And it then displays the new user card", () => {
        it("renders a span element with the username", () => {
          const spanElement = screen.getByText(new RegExp(testUsername));
          expect(spanElement).toBeInTheDocument();
          expect(spanElement.nodeName).toBe("SPAN");
        });

        it("renders a div element with the avatar inside", () => {
          const img = screen.getByAltText("User Avatar");
          const div = img?.parentNode;

          expect(div).toBeDefined();
          expect(div).toBeInTheDocument();
          expect(img).toBeInTheDocument();
          expect(img).toHaveAttribute(
            "src",
            `data:image/png;base64,${userAvatar}`
          );
          expect(div!.nodeName).toBe("DIV");
        });
      });
    });
  });

  describe("Given a user has already registered", () => {
    it("renders a span element with the username", () => {
      renderUI({ userProfile: testInput });

      const spanElement = screen.getByText(new RegExp(testUsername));
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.nodeName).toBe("SPAN");
    });

    it("renders a div element with the avatar inside", () => {
      const { getByAltText } = renderUI({ userProfile: testInput });
      const img = screen.getByAltText("User Avatar");
      const div = img?.parentNode;

      expect(div).toBeDefined();
      expect(div).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", `data:image/png;base64,${userAvatar}`);
      expect(div!.nodeName).toBe("DIV");
    });
  });
});

// describe("<button> is clicked and the form is INVALID", () => {
//   it("is disabled", () => {});
//   test("there is a prompt text next to the invalid field", () => {});
// });
