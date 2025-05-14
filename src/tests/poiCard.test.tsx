import React from "react";
import { render, screen } from "@testing-library/react";
import { POICard } from "../components/poiCard";
import "@testing-library/jest-dom";

describe("POICard Component", () => {
  const mockPOI = {
    name: "Eiffel Tower",
    duration: "1:00",
    imageUrl:
      "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  test("renders the POI Card with correct title and duration", () => {
    render(<POICard title={mockPOI.name} duration={mockPOI.duration} imageUrl={mockPOI.imageUrl} />);
    const titleElement = screen.getByText("Eiffel Tower");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H3");

    const durationElement = screen.getByText("1:00");
    expect(durationElement).toBeInTheDocument();
    expect(durationElement.tagName).toBe("P");
  });

  test("renders the POI Card with correct image", () => {
    render(<POICard title={mockPOI.name} duration={mockPOI.duration} imageUrl={mockPOI.imageUrl} />);

    const imageElement = screen.getByRole("img");

    expect(imageElement).toBeInTheDocument();

    // checks that the imageElement's source is the same as the prop's imageUrl
    expect(imageElement).toHaveAttribute("src", mockPOI.imageUrl);
  });
});
