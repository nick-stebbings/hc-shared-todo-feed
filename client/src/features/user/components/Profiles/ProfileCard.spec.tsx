import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const MockConductor = require("@holo-host/mock-conductor");
import { mockCallZomeFn, PORT } from "setupTests";
import api from "services/zomeApis";

import { store } from "app/store";
import { useAppDispatch } from "app/hooks";
import { Provider } from "react-redux";
import { createProfileZome } from "features/user/actions";
import { initialState } from "features/user/reducer";

import { ProfileCard } from "./ProfileCard";
type ComponentProps = React.ComponentProps<typeof ProfileCard>;

// Mocks
import { userAvatar } from "./testImage";
const testUsername = "Davey";
const testInput = {
  nickname: testUsername,
  fields: { avatar: userAvatar },
};

//Helpers
function renderUI(props: ComponentProps) {
  let onChange;
  function TestEnvironment() {
    const [profile, setProfile] = useState(props.userProfile);
    const dispatch = useAppDispatch();
    const handleSubmit = () => {
      dispatch(createProfileZome(profile?.nickname, profile?.fields));
    };

    onChange = jest.fn((v) => setProfile(v));
    return (
      <ProfileCard
        {...props}
        userProfile={profile || initialState.myProfile}
        setUserProfile={setProfile}
        handleSubmit={handleSubmit}
        onChange={onChange}
      />
    );
  }
  return render(
    <Provider store={store}>
      <TestEnvironment />
    </Provider>
  );
}

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
          setIsValidForm: () => true,
          isSubmitted: false,
        });
      });

      afterEach(() => {
        mockHolochainConductor.clearResponses();
        jest.clearAllMocks();
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

      it("And it calls zomeFn register profile", async () => {
        userEvent.type(
          screen.getByLabelText(/Nickname:/i),
          `${testUsername}{enter}`
        );

        await waitFor(() =>
          expect(api.profiles.create_profile.create).toHaveBeenCalledTimes(1)
        );
      });

      describe("And it then displays the new user card", () => {
        it("renders a span element with the username", async () => {
          userEvent.type(
            screen.getByLabelText(/Nickname:/i),
            `${testUsername}{enter}`
          );

          await waitFor(() =>
            expect(
              screen.getByText(new RegExp(testUsername))
            ).toBeInTheDocument()
          );
        });

        it("renders a div element with the avatar inside", async () => {
          userEvent.type(
            screen.getByLabelText(/Nickname:/i),
            `${testUsername}{enter}`
          );

          const img = await screen.findByAltText("User Avatar");
          const div = img?.parentNode;

          expect(div).toBeDefined();
          expect(div!.nodeName).toBe("DIV");
          expect(img).toBeInTheDocument();
          expect(img).toHaveAttribute(
            "src",
            `data:image/png;base64,${userAvatar}`
          );
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
      renderUI({ userProfile: testInput });

      const img = screen.getByAltText("User Avatar");
      const div = img?.parentNode;

      expect(div).toBeDefined();
      expect(div!.nodeName).toBe("DIV");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", `data:image/png;base64,${userAvatar}`);
    });
  });
});
