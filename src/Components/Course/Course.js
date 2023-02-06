import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import logo from "../../assets/images/uepb-bw.png"

export default function Course(){
    const { course } = useParams();
    const [ chairs, setChairs ] = useState([]);
    const [ periods, setPeriods ] = useState([])
    return (
        <>
            <Header> <img src={logo} alt="logo" />  {course.replaceAll('_', ' ').toUpperCase().replace('-', ' - ').replace(`-${course[course.length-1]}`, '')} </Header>
            <Body>
                <ListChairs course={course} chairs={chairs} setChairs={setChairs} periods={periods} setPeriods={setPeriods} />
            </Body>
        </>
    )
}

function ListChairs({ course, chairs, setChairs, periods, setPeriods }){
    useEffect(() => {
        const promise = api.get(`/chairs/${course[course.length-1]}`)
        promise.then(response => {
            const { data } = response;
            console.log(response.data)
            setChairs(data)
        })
        promise.catch((err) => {
            console.log(`Error ${err.response.status}, ${err.data}`)
        })
    },[])
    
    // const perPeriod = chairs.reduce((periods, chair) => {
    //     if(!periods[chair.period]){
    //         periods[chair.period] = [];
    //     }
    //     periods[chair.period].push(chair);
    //     return periods
    // }, {})

    // const perPeriodArr = Object.entries(perPeriod)

    // console.log(perPeriodArr)

    return (
        <CourseChairs>
            <ChairPeriodOne>
                {
                    chairs?.filter(period => period.period === 1).map((chair) => <First period={chair.period} chair={chair.chair} key={chair.id} id={chair.id} />)
                }
            </ChairPeriodOne>
            <ChairPeriodTwo>
                {
                    chairs?.filter(period => period.period === 2).map((chair) => <Second period={chair.period} chair={chair.chair} key={chair.id} id={chair.id} />)
                }
            </ChairPeriodTwo>
        </CourseChairs>
    )
}

function First({ period, chair, id }){
    return(
        <Periods>
            {
                id === 1 ? 
                    <Period>
                        {period}º Período
                    </Period>
                :"" 
            }  
            <Chair>
                {chair}
            </Chair>
        
        </Periods>
    )
}
function Second({ period, chair, id }){
    console.log(id)
    return(
        <Periods>
            {
                id === 8 ? 
                    <Period>
                        {period}º Período
                    </Period>
                :"" 
            }  
            <Chair>
                {chair}
            </Chair>
        
        </Periods>
    )
}

const Body = styled.div`
    background-color: #a9a9a9;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`;

const Header = styled.div`
    background-color: #D11071;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-align: center;

    display: flex;
    align-items: center;
    gap: 50px;

    width: 100%;
    height: 80px;

    img {
        width: 200px;
        height: 65px;
        margin-left: 35px;
    }
`;

const CourseChairs = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    gap: 55px;
`;

const ChairPeriodOne = styled.div`
    height: 100vh;
    width: 150px;
    margin: 20px;
    gap: 20px;
    
    display: flex;
    flex-direction: column;
`;
const ChairPeriodTwo = styled.div`
    height: 100vh;
    width: 150px;
    margin: 20px;
    gap: 20px;
    
    display: flex;
    flex-direction: column;
`;

const Periods = styled.div`
    width: 250px;
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Period = styled.div`
    width: 220px;
    height: 40px;
    background-color: #ffffff;
    font-size: 15px;
    color: black;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Chair = styled.div`
    width: 220px;
    height: 90px;
    background-color: white;
    font-size: 15px;
    font-weight: 400;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;