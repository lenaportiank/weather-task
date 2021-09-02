import React from "react";

class Form extends React.Component{
    render(){
        return(
            <form className="form_city" onSubmit = {this.props.getMethod}>
                <input className="name_city" type="text" name="city" placeholder="City" />
                <button className="search">Search</button>
            </form>
        );
    }
}

export default Form;