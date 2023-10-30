import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Home=()=>{
    const [PeopleData, setPeopleData] = useState(null);

    useEffect(()=>{
        const API_URL = 'https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json';
        axios.get(API_URL)
            .then(res=>{
            //    console.log('Response from main API: ',res)
            //    console.log('Home Data: ',res.data)
                setPeopleData(res.data);
                console.log('PeopleData: ', PeopleData);
            })
            .catch(err=>{
                console.log(err);
            })
    },[])

    return(
        <>
        {
             PeopleData && PeopleData.map((people) => (
                <div className="people">
                    <h4 style={{'padding-bottom': '2px'}}>{people.gender}</h4>
                    <ul>
                            {
                                people.pets && people.pets
                                .filter(person => person.type === 'Cat')
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((cat, index) => (
                                    <li key={index}>{cat.name}</li>
                                ))
                            }
                        </ul>
                </div>
              ))
        }
        </>
    )
}

export default Home;