import React from "react";
import styled from "styled-components";

const Styles = styled.div`

`;

class Slider extends React.Component{

    handleOnChange = (e) => {
        this.setState({value: e.target.value});
        
        this.props.color();
    }


    render(){
        return(
            <Styles>
                <input
                    type="range"
                    min={-30} max={40}
                    value={this.props.value}
                    className="slider"
                    onChange={this.handleOnChange}
                />
            </Styles>
        );
    }
}

export default Slider;