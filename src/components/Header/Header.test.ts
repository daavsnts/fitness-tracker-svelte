import "@testing-library/jest-dom";

import { render, fireEvent, screen, act } from "@testing-library/svelte";

import Header from "./Header.svelte";

test("shows a welcome message to the logged in user", () => {
  render(Header, { user: { name: "Victor" } });
  const welcome = screen.getByText("Victor");
  expect(welcome).toBeInTheDocument();
});

// Note: This is as an async test as we are using `fireEvent`
test("emits the correct events when log in, sign up or log out are clicked", async () => {
  const { component } = render(Header, {
    props: { user: null },
  });

  const mockLoginHandler = vi.fn();
  const mockLogoutHandler = vi.fn();
  const mockSignupHandler = vi.fn();

  component.$on("login", mockLoginHandler);
  component.$on("logout", mockLogoutHandler);
  component.$on("createAccount", mockSignupHandler);

  const loginButton = screen.getByRole("button", { name: /Log in/i });
  const signupButton = screen.getByRole("button", { name: /Sign up/i });

  // Using await when firing events is unique to the svelte testing library because
  // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
  await fireEvent.click(loginButton);
  await fireEvent.click(signupButton);

  expect(mockLoginHandler).toHaveBeenCalled();
  expect(mockSignupHandler).toHaveBeenCalled();

  // Act flushes all changes that need to be changed after running the given function
  await act(() => {
    component.$set({ user: { name: "Victoria" } });
  });

  const logoutButton = screen.getByRole("button", { name: /Log out/i });
  await fireEvent.click(logoutButton);

  expect(mockLogoutHandler).toHaveBeenCalled();
});
