import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import POICardList from "@/components/poiList";
import "@testing-library/jest-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", { value: mockSessionStorage });

describe("POICardList Component", () => {
  const mockData = [
    {
      _id: "1",
      name: "Eiffel Tower",
      description: "An iron tower in Paris",
      audioField: "eiffel.mp3",
      duration: "1:00",
      imageUrl: "https://example.com/eiffel.jpg",
      isComplete: false,
    },
    {
      _id: "2",
      name: "Statue of Liberty",
      description: "A historic statue in New York",
      audioField: "liberty.mp3",
      duration: "2:30",
      imageUrl: "https://example.com/liberty.jpg",
      isComplete: false,
    },
  ];

  beforeEach(() => {
    // Set initial session storage state
    sessionStorage.setItem("poiData", JSON.stringify(mockData));
  });

  test("renders the component with correct elements", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <POICardList />
      </ChakraProvider>,
    );

    expect(screen.getByText("All Audios")).toBeInTheDocument();
    expect(screen.getByText("Kathleens Overlook Canyon")).toBeInTheDocument();
    expect(screen.getByText("Eiffel Tower")).toBeInTheDocument();
    expect(screen.getByText("Statue of Liberty")).toBeInTheDocument();
  });

  test("displays correct progress initially", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <POICardList />
      </ChakraProvider>,
    );
    expect(screen.getByText("Visited Spots:")).toBeInTheDocument();
    expect(screen.getByText("0/2")).toBeInTheDocument();
  });

  test("marks a POI as complete and updates progress", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <POICardList />
      </ChakraProvider>,
    );

    const firstCheckButton = screen.getAllByRole("button")[0]; // First POI's button
    fireEvent.click(firstCheckButton);

    expect(firstCheckButton).toHaveClass("POIchecked");
    expect(screen.getByText("Visited Spots:")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });

  test("toggles POI completion when clicking the check button again", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <POICardList />
      </ChakraProvider>,
    );

    const firstCheckButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstCheckButton); // Mark as complete
    fireEvent.click(firstCheckButton); // Unmark

    expect(firstCheckButton).not.toHaveClass("POIchecked");
    expect(screen.getByText("Visited Spots:")).toBeInTheDocument();
    expect(screen.getByText("0/2")).toBeInTheDocument();
  });
});
