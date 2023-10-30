import React, { useState } from "react";
import useAxios from './customHook/useAxios';

const FetchData = () => {
  const [PeopleData, setPeopleData] = useState(null);
  const URI = 'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json';
  useAxios(URI, setPeopleData);

  if (!PeopleData) {
    return <span data-testid="loading">Loading data...</span>;
  }

  return (
    <>
      {
        /**
         * iterate people api and display person data.
         */
        PeopleData && PeopleData.map((people) => (
          <div className="people" data-testid="peopleContainer">
            <h4 style={{ 'padding-bottom': '2px' }}>{people.gender}</h4>
            <ul>
              {
                people.pets && people.pets
                  /**
                   * filter logic apply here for pet type Cat
                   */
                  .filter(person => person.type === 'Cat')
                  /**
                   * sorting logic apply here for alphabetic order sorting
                   */
                  .sort((a, b) => a.name.localeCompare(b.name))
                  /**
                   * iterate pet data with cat name.
                   */
                  .map((cat, index) => (
                    <li key={index}>{cat.name}</li>
                  ))
              }
            </ul>
          </div>
        ))
      }
    </>
  );
}

export default FetchData;