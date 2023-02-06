import styled from "styled-components"
import { useEffect, useState } from "react"

import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CoursesScreen(){
    const [ courses, setCourses ] = useState([])
    return (
        <>  
            <Body>
                <Name> Cursos UEPB </Name>
                <ListCourses courses={courses} setCourses={setCourses}/>
            </Body>
        </>
    )
}


function ListCourses({courses, setCourses}){
    useEffect(() => {
        const promise = api.get('/courses')
        promise.then(response => {
            const { data } = response;
            setCourses(data)
        })

        promise.catch((err) => {
            console.log(`Error ${err.response.status}, ${err.data}`)
        })
    },[])
    
    const [search, setSearch] = useState('');
    return (
        <Menu> 
            <Input type="text" placeholder="Curso" value={search} onChange={(e) => setSearch(e.target.value)} />
            <ListCourse>
                {
                    courses?.filter(course => search == course.course.substr(0, search.length) || search == course.course.substr(0, search.length).toLowerCase())
                            .map((course) => <Courses course={course.course} classShift={course.classShift} id={course.id} key={course.id} />)
                }
            </ListCourse>
        </Menu>
    )
}

function Courses({course, classShift, id}) {
    const navigate = useNavigate();
    return(
        <Course onClick={() => navigate(`/${course.replaceAll(' ', '_').toLowerCase().replace('ê', 'e').replace('ç', 'c').replace('ã', 'a')}-${classShift.charAt(0).toLowerCase()}-${id}`)} >
            {course} - {classShift.charAt(0)}
        </Course>
    )
}

const Body = styled.div`
    background: #a9a9a9;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column ;
`;

const Name = styled.div`
    display: flex;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    font-size: 50px;
`;

const Input = styled.input`
    border-radius: 10px;
    width: 500px;
    height: 30px;
    font-size: 15px;
    background: rgba( 255, 255, 255, 0.5);
    caret-color: #d44598;
    margin-top: 70px;
    margin-bottom: 50px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ListCourse = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    width: 670px;
    height: 180px;
    gap: 10px;
`;

const Course = styled.div`
    background-color: #D11071;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 240px;
    height: 50px;

    cursor: pointer;
`;