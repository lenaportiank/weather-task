import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class DialogIcon extends React.Component{

    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Get weather for this location?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Latitude is : {this.props.lat}</p>
                        <p>Longitude is : {this.props.lon}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.allow}>Yes</Button>
                    <Button variant="danger" onClick={this.props.cancel}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DialogIcon;