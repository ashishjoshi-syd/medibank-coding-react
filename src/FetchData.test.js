import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import '@testing-library/jest-dom';
import mockedAxios from 'axios';
import FetchData from "./FetchData";

afterEach(cleanup);

export default {
    get: jest.fn().mockResolvedValue({ data: {} })
};

it("fetches and displays data", async () => {
    // We'll be explicit about what data Axios is to return when `get` is called.
    mockedAxios.get.mockResolvedValueOnce({ data: { greeting: "hello there" } });
  
    // Let's render our Fetch component, passing it the url prop and destructuring
    // the `getByTestId` function so we can find individual elements.
    const { getByTestId } = render(<FetchData />);
  
    // On first render, we expect the "loading" span to be displayed
    expect(getByTestId("loading")).toHaveTextContent("Loading data...");
  
    // Because the useAxios call (useEffect) happens after initial render
    // We need to handle the async nature of an AJAX call by waiting for the
    // element to be rendered.
    const resolvedSpan = await waitForElement(() => getByTestId("resolved"));
  
    // Now with the resolvedSpan in hand, we can ensure it has the correct content
    expect(resolvedSpan).toHaveTextContent("hello there");
    // Let's also make sure our Axios mock was called the way we expect
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(url);
});