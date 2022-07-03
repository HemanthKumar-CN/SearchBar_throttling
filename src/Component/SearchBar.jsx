import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useThrottle} from 'use-throttle';



const SearchBar = ({loading,setLoading, onChange,suggestions}) => {
    const [inputText, setInputText] = useState("")
    const [active, setActive] = useState(0)


    const throttledtext = useThrottle(inputText, 1000)

    useEffect(() => {
      
      onChange(throttledtext)
    
    }, [throttledtext,onChange])
    


    const handleInputChange =(e)=>{
        setInputText(e.target.value)
        // onChange(e.target.value);
        setLoading(true)
    }

    const handleClear =()=>{
      setInputText("")
      onChange("")
      setLoading(false)
    }

    // console.log(suggestions)

    const handleActiveSuggestions =(e)=>{
      switch(e.keyCode){

        case 40:
          // arrowDown
          if(active >=5)
          {
            setActive(0)
          }
          else
          {
            setActive(prev=> prev+1)
          }
          break;

        case 38:
          // arrowup
          if(active <= 0)
          {
            setActive(5)
          }
          else
          {
            setActive(prev => prev - 1)
          }
          break;

        case 13:
          // enter
          break;

          default:
            return;
      }
      
    }

  return (
    <>
    <SearchBarWrapper len={suggestions.length} onKeyUp={handleActiveSuggestions}>
        
        <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/500px-Search_Icon.svg.png'/>
        <Input value={inputText} onChange={handleInputChange}/>
        <RightSide>
            { inputText && <Image src='https://cdn-icons-png.flaticon.com/512/748/748122.png' style={{cursor: 'pointer'}} onClick={handleClear}/>}
            {loading && <StyledSpinner viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </StyledSpinner> }
        </RightSide>
    </SearchBarWrapper>
    {
      !loading && suggestions.length >0 && (
        <SuggestionBox len={suggestions.length} limit={5} active={active}>
          {
            suggestions.map((item,index) => (
              <div key={item} onMouseOver={()=> setActive(index + 1)}>{item}</div>
            ))
          }
        </SuggestionBox>
      )
    }
    </>
  )
}

export default SearchBar

const SuggestionBox = styled.div`
    border: 1px solid;
    max-height: 200px;
    overflow: auto;
    border-bottom-left-radius: 20px;
    text-align:left;
    padding-left: 3.2em;
    border-top-color: ${({len}) => (len ? 'transparent' : 'black')};


    & :nth-child(${({active}) => active}) {
      background: lightblue;
      color:black;
      cursor:pointer;
    }

    & :nth-child(n + ${({limit}) => limit + 1}){
      display: none;
    }
    
`;

const SearchBarWrapper = styled.div`
    border: 1px solid;
    display: flex;
    border-radius: 20px;
    padding: 5px 10px;
    align-items: center;
    border-bottom-right-radius: ${({len})=> (len ? "0px" : "20px")};
    border-bottom-left-radius: ${({len})=> (len ? "0px" : "20px")};
`;

const Image = styled.img`
    height: 20px;
    padding-right: 20px;
`;

const Input = styled.input`
    font-size: 20px;
    flex: 1;
    border:none;
    outline:none;
`

const RightSide = styled.div`

`

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;